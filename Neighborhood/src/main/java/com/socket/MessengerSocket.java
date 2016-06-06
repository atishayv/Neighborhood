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

import org.json.JSONException;
import org.json.JSONObject;

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
        active_clients.put(user_id.toString(), session);
        
    }
 
    @OnMessage
    public String onMessage(@PathParam("user_id") String user_id, String message, Session session) throws IOException, JSONException {
    	System.out.println("active_clients :: " + active_clients);
    	JSONObject message_obj = new JSONObject(message);
    	System.out.println("Message :: " + message + "to " + message_obj.get("user_id_to"));
    	if(active_clients.containsKey(message_obj.get("user_id_to").toString())){
    		System.out.println("user_id : " + message_obj.get("user_id_to") + " is active");
			Session client = active_clients.get(message_obj.get("user_id_to").toString());
			client.getBasicRemote().sendText(message);
			JSONObject response = new JSONObject();
			response.put("status", "success");
			response.put("request_obj", message);
			//send to original user thta successfully send message
			Session client_from = active_clients.get(message_obj.get("user_id_from").toString());
			client_from.getBasicRemote().sendText(response.toString());
			return response.toString();
		}else{
			System.out.println("user_id : " + message_obj.get("user_id_to") + " is not active");
			JSONObject response = new JSONObject();
			response.put("status", "fail");
			response.put("request_obj", message);
			//send to original user that could not send message
			Session client_from = active_clients.get(message_obj.get("user_id_from").toString());
			client_from.getBasicRemote().sendText(response.toString());
			return response.toString();
		}
        
    }
 
    @OnClose
    public void onClose(@PathParam("user_id") String user_id, Session session, CloseReason closeReason) {
    	System.out.println(String.format("Session %s closed because of %s", session.getId(), closeReason,user_id));
    	active_clients.remove(user_id);
    }
}
