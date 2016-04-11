package com.socket;

import java.io.IOException;
import java.util.HashMap;

import javax.websocket.CloseReason;
import javax.websocket.CloseReason.CloseCodes;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/messenger_socket/{user_id}")
public class MessengerSocket {
	
	public static HashMap<String,Session> active_clients = new HashMap<String, Session>();
	static MessengerSocket messenger_socket_instance;
	
	public static synchronized MessengerSocket getInstance(){
		if(messenger_socket_instance==null){
			messenger_socket_instance = new MessengerSocket();
		}
		return messenger_socket_instance;
	}
	
	@OnOpen
    public void onOpen(@PathParam("user_id") String user_id, Session session) {
        System.out.println("Connected ... " + session.getId() + "user_id  " +user_id);
        active_clients.put(user_id, session);
        
    }
 
    @OnMessage
    public String onMessage(@PathParam("user_id") String user_id, String message, Session session) throws IOException {
    	System.out.println("Message :: " + message + "to " + user_id);
    	if(active_clients.containsKey(user_id)){
			Session client = active_clients.get(user_id);
			client.getBasicRemote().sendText(message);
			return "Successfully sent message to client";
		}else{
			return "Client connection does not exist";
		}
        
    }
 
    @OnClose
    public void onClose(@PathParam("user_id") String user_id, Session session, CloseReason closeReason) {
    	System.out.println(String.format("Session %s closed because of %s", session.getId(), closeReason,user_id));
    	active_clients.remove(user_id);
    }
}
