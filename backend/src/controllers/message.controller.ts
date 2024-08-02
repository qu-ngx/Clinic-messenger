import { Request, Response } from "express";
import prisma from "../db/prisma.js"

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user.id;

        // Find the conversation with sender and receiver Id in conversation table
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        });

        // Create the conversation room (like the chat box between the two)
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId ,receiverId]
                    }
                }
            });
        }

        // Create newMessage with the sender, message and conver Id info
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id
            }
        });

        // Enter Conversation table and update the conversation with the following data
        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        }
                    }
                }
            });
        }

        // SocketIO will appear here

        res.status(200).json(newMessage);

    } catch (error: any) {
        console.error("Error in sendMessage", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user.id;

        // find the conversation in Conversation table that has every fields in participantIds
        // include the messages that are in ascending order (asc)
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery:[senderId, userToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error: any) {
        console.error("Error in sendMessage", error.message);
        res.status(500).json({error: "Internal Server Error"});    
    }
}