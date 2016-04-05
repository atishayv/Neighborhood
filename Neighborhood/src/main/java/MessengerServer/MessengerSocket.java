package MessengerServer;

import java.io.IOException;
import java.util.HashMap;

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
	
	
	@OnMessage
	public String onMessage(String user_id, String message, Session session) 
		    throws IOException {
		    
		if(active_clients.containsKey(user_id)){
			Session client = active_clients.get(user_id);
			client.getBasicRemote().sendText(message);
			return "Successfully sent message to client";
		}else{
			return "Client connection does not exist";
		}
		
	}
		  
	  @OnOpen
	  public void onOpen(@PathParam("user_id") String user_id, Session session) throws IOException {
		  active_clients.put(user_id, session);
	  }
	  
	  
	  @OnClose
	  public void onClose(@PathParam("user_id") String user_id, Session session) throws IOException {
		  active_clients.remove(user_id);
	  }
}
