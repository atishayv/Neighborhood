package com.services.neighbour.controller;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.sql.*;
import java.util.Iterator;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;












import MessengerServer.MessengerSocket;

//import com.google.gson.JsonObject;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;

public class RequestServlet extends HttpServlet{
	
	private MysqlDataSource datasource;
	
	// JDBC driver name and database URL
   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
   static final String DB_URL = "jdbc:mysql://localhost/localitydb";

   //  Database credentials
   static final String USER = "root";
   static final String PASS = "root";
	   
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		 try {
			 datasource = new MysqlDataSource();
			 datasource.setUrl(DB_URL);
			 datasource.setUser("root");
			 datasource.setPassword("root");
	    }
	    catch (Exception e) {
	      e.printStackTrace();
	    }
	}
	
	private Connection getConnection() throws SQLException {
	    return datasource.getConnection();
	}
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doGet(req, resp);
		System.out.println("Inside doGet");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		
		 Connection connection=null;
		 PreparedStatement stmt = null;
		 ResultSet rs = null;
	    try {
	      connection = getConnection();
	      //..<do JDBC work>..
				StringBuilder sb = new StringBuilder();
				String line;
				try {
				    BufferedReader reader = req.getReader();
				    while ((line = reader.readLine()) != null)
				    	sb.append(line);
				  } catch (Exception e) { /*report an error*/ }

			
				JSONObject requestObject = new JSONObject(sb.toString());
				
				System.out.println(requestObject);
				
				if(requestObject.getString("action").equalsIgnoreCase("new_user_register")){
					String first_name = requestObject.getString("first_name");
					String last_name = requestObject.getString("last_name");
					String password = "";
					if(requestObject.has("password"))
						password = requestObject.getString("password");
					String email = requestObject.getString("email_id");
					
					
					
				    String sql;
				    sql = "SELECT * FROM USER_DATA WHERE mail_id='"+email+"'";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    if (!rs.isBeforeFirst() ) {
				    	 sql = "INSERT INTO USER_DATA (password,first_name,last_name,mail_id) VALUES ('"+password+"','"+first_name+"','"+last_name+"','"+email+"')";
				    	 System.out.println(sql);
				    	 stmt.executeUpdate(sql);
				    	 String responseStr = "Successfully inserted user in DB";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
			    	}else{
			    		String responseStr = "User already exist";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8"));
			    		
			    	}
				}else if(requestObject.getString("action").equalsIgnoreCase("login")){
					String password = requestObject.getString("password");
					String email = requestObject.getString("email_id");
					
					
				    String sql;
				    sql = "SELECT * FROM USER_DATA WHERE mail_id='"+email+"' AND password='"+password+"'";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    if (!rs.isBeforeFirst() ) {
				    	String responseStr = "User does not exist";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	JSONArray responseArr = convertToArray(rs);
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				    	
				    }
				}else if(requestObject.getString("action").equalsIgnoreCase("get_user_info")){
					String user_id = requestObject.getString("user_id");
					
					
				    String sql;
				    sql = "SELECT * FROM USER_DATA WHERE user_id='"+user_id+"'";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    if (!rs.isBeforeFirst() ) {
				    	String responseStr = "Inavlid User Id";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	JSONArray responseArr = convertToArray(rs);
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				    	
				    }
				}else if(requestObject.getString("action").equalsIgnoreCase("update_user_data")){
					JSONObject data = new JSONObject(requestObject.getString("data"));
					String updateString = "";
					
					//check for all the fields coming coming from client and execute appropriate update query
					if(data.has("DOB") && !data.getString("DOB").equalsIgnoreCase("")){
						java.util.Date dt = new java.util.Date(data.getString("DOB"));
						 java.text.SimpleDateFormat sdf = 
							     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						 updateString += "DOB='"+sdf.format(dt)+"',";
					}
					
					if(data.has("first_name") && !data.getString("first_name").equalsIgnoreCase("")){
						updateString += "first_name='"+data.getString("first_name")+"',";
					}
					if(data.has("last_name") && !data.getString("last_name").equalsIgnoreCase("")){
						updateString += "last_name='"+data.getString("last_name")+"',";
					}
					if(data.has("profile_pic") && !data.getString("profile_pic").equalsIgnoreCase("")){
						updateString += "profile_pic='"+data.getString("profile_pic")+"',";
					}
					if(data.has("school") && !data.getString("school").equalsIgnoreCase("")){
						updateString += "school='"+data.getString("school")+"',";
					}
					if(data.has("college") && !data.getString("college").equalsIgnoreCase("")){
						updateString += "college='"+data.getString("college")+"',";
					}
					if(data.has("workplace") && !data.getString("workplace").equalsIgnoreCase("")){
						updateString += "workplace='"+data.getString("workplace")+"',";
					}
					if(data.has("gender") && !data.getString("gender").equalsIgnoreCase("")){
						updateString += "gender='"+data.getString("gender").substring(0, 1)+"',";
					}
					if(data.has("relationship_status") && !data.getString("relationship_status").equalsIgnoreCase("")){
						updateString += "relationship_status='"+data.getString("relationship_status")+"',";
					}
					if(data.has("address") && !data.getString("address").equalsIgnoreCase("")){
						updateString += "address='"+data.getString("address")+"',";
					}
					if(data.has("latitude") && !data.getString("latitude").equalsIgnoreCase("")){
						updateString += "latitude='"+data.getString("latitude")+"',";
					}
					if(data.has("longitude") && !data.getString("longitude").equalsIgnoreCase("")){
						updateString += "longitude='"+data.getString("longitude")+"',";
					}
					if(data.has("contact_number") && !data.getString("contact_number").equalsIgnoreCase("")){
						updateString += "contact_number='"+data.getString("contact_number")+"',";
					}
					if(data.has("locality_id") && !data.getString("locality_id").equalsIgnoreCase("")){
						updateString += "locality_id='"+data.getString("locality_id")+"',";
					}
					if(data.has("user_status") && !data.getString("user_status").equalsIgnoreCase("")){
						updateString += "user_status='"+data.getString("user_status")+"',";
					}
					if(updateString!=""){
						updateString = updateString.substring(0, updateString.length()-1);
						
						String sql = "UPDATE USER_DATA SET "
						 		+ updateString
						 		+" WHERE mail_id='"+data.getString("mail_id")+"'";
						System.out.println(sql);
						stmt = connection.prepareStatement(sql);
						stmt.executeUpdate();
					}
					
					String sql = "SELECT * FROM USER_DATA WHERE mail_id='"+data.getString("mail_id")+"'";
				    rs = stmt.executeQuery(sql);
				    
				    JSONArray responseArr = convertToArray(rs);
					
		    		resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				}else if(requestObject.getString("action").equalsIgnoreCase("update_profile_pic")){
					JSONObject data = new JSONObject(requestObject.getString("data"));
					String updateString = "";
					String location = "";
					
					if(data.has("profile_pic") && !data.getString("profile_pic").equalsIgnoreCase("")){
						//convert the base 64 data to image file and store image file path in database
						 try {
				        	String imageString = data.getString("profile_pic");
				        	
				        	String base64Image = imageString.split(",")[1];
				        	byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
				        	
				        	BufferedImage bImage = ImageIO.read(new ByteArrayInputStream(imageBytes));
				            
				        	//get the user_id
				        	String sql = "SELECT user_id FROM USER_DATA WHERE mail_id='"+data.getString("mail_id")+"'";
				        	stmt = connection.prepareStatement(sql);
						    rs = stmt.executeQuery();
						    rs.next();
						    System.out.println(rs.getInt("user_id"));
						    
				            //File file = new File(getServletContext().getRealPath(File.separator) +"profile_pics/profile_pic_"+rs.getInt("user_id")+".png");
						    File file = new File("D:/My_Workspace/Neighbourhood/NameNotDecided/Neighborhood/src/main/webapp/profile_pics/profile_pic_"+rs.getInt("user_id")+".png");
				            
				            
				            ImageIO.write(bImage, "png", file); 
					            
					        } catch (Exception e) {
					        	e.printStackTrace();
					        }
					        
					        
						
						updateString += "profile_pic='../profile_pics/profile_pic_"+rs.getInt("user_id")+".png',";
						System.out.println(updateString);
					}
					if(updateString!=""){
						updateString = updateString.substring(0, updateString.length()-1);
						
						String sql = "UPDATE USER_DATA SET "
						 		+ updateString
						 		+" WHERE mail_id='"+data.getString("mail_id")+"'";
						System.out.println(sql);
						stmt = connection.prepareStatement(sql);
						stmt.executeUpdate();
					}
					
					
		    		resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,"Successfully updated profile pic".getBytes("UTF-8"));
				}else if(requestObject.getString("action").equalsIgnoreCase("post_feed")){
					
					JSONObject data = new JSONObject(requestObject.getString("data"));
					
					String user_id = data.getString("user_id");
					String feed_title = data.getString("feed_title");
					String feed_desc = data.getString("feed_desc");
					String post_time = data.getString("post_time");
					String feed_image = data.getString("feed_image");
					String likes = data.getString("likes");
					String category = data.getString("category");
					String locality_id = data.getString("locality_id");
					
					
				    String sql;
				    sql = "INSERT INTO FEEDS_DATA (user_id,feed_title,feed_desc,post_time,feed_image,likes,category,locality_id) VALUES ("+user_id+","+feed_title+","+feed_desc+","+post_time+","+feed_image+","+likes+","+category+","+locality_id+")";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    if (!rs.isBeforeFirst() ) {
				    	String responseStr = "Something went wrong";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	String responseStr = "Successfully inserted data";
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8"));
				    	
				    }
				}else if(requestObject.getString("action").equalsIgnoreCase("post_comment")){
					
					JSONObject data = new JSONObject(requestObject.getString("data"));
					
					String user_id = data.getString("user_id");
					String feed_id = data.getString("feed_id");
					String comment_text = data.getString("comment_text");
					String post_time = data.getString("post_time");
					String likes = data.getString("likes");
					
					
				    String sql;
				    sql = "INSERT INTO COMMENTS_DATA (user_id,feed_id,comment_text,post_time,likes) VALUES ("+user_id+","+feed_id+","+comment_text+","+post_time+","+likes+")";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    if (!rs.isBeforeFirst() ) {
				    	String responseStr = "Something went wrong";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	String responseStr = "Successfully inserted data";
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8"));
				    	
				    }
				}else if(requestObject.getString("action").equalsIgnoreCase("search_home")){
					String search_term = requestObject.getString("search_term");
					
					
				    String sql;
				    sql = "SELECT * FROM LOCALITY_DATA WHERE name LIKE '%"+search_term+"%'";
				    JSONArray responseArr = new JSONArray();
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    JSONArray responseArr1 = new JSONArray();
				    if (!rs.isBeforeFirst() ) {
				    	System.out.println("Did not get any data from locality search..");
				    }else{
				    	responseArr1 = convertToArray(rs);
				    }
				    
				    
				    sql = "SELECT * FROM USER_DATA WHERE first_name LIKE '%"+search_term+"%'";
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    JSONArray responseArr2 = new JSONArray();
				    if (!rs.isBeforeFirst() ) {
				    	System.out.println("Did not get any data from user data search..");
				    }else{
				    	responseArr2 = convertToArray(rs);
				    }
				    
				    for (int i = 0; i < responseArr1.length(); i++) {
				    	responseArr.put(responseArr1.get(i));
				    }
				    for (int i = 0; i < responseArr2.length(); i++) {
				    	responseArr.put(responseArr2.get(i));
				    }
				    
				    if(responseArr.length()==0){
				    	String responseStr = "No matching results...";
			    		resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseStr.getBytes("UTF-8")); 
				    }else{
				    	resp.setHeader("Cache-Control", "no-cache");
						sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				    }
				    
				    
				}else if(requestObject.getString("action").equalsIgnoreCase("get_feed_data")){
					String locality_id = requestObject.getString("locality_id");
					String timestamp = requestObject.getString("timestamp");
					String sql;
					if(timestamp.equalsIgnoreCase(""))
						sql = "SELECT * FROM FEEDS_DATA,USER_DATA WHERE FEEDS_DATA.locality_id='"+locality_id+"' AND FEEDS_DATA.user_id = USER_DATA.user_id ORDER BY post_time DESC LIMIT 15";
					else
						sql = "SELECT * FROM FEEDS_DATA,USER_DATA WHERE FEEDS_DATA.locality_id='"+locality_id+"' AND FEEDS_DATA.user_id = USER_DATA.user_id AND post_time<='"+timestamp+"' ORDER BY post_time DESC";
					
					JSONArray feedsArr = new JSONArray();
					JSONArray responseArr = new JSONArray();
					
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    feedsArr = convertToArray(rs);
				    for(int i=0;i<feedsArr.length();i++){
				    	JSONObject feed_data = (JSONObject)feedsArr.get(i);
				    	sql = "SELECT * FROM COMMENTS_DATA,USER_DATA WHERE COMMENTS_DATA.feed_id='" + feed_data.get("feed_id") + "' AND COMMENTS_DATA.user_id = USER_DATA.user_id";
				    	stmt = connection.prepareStatement(sql);
					    rs = stmt.executeQuery();
					    JSONArray commentsArr = new JSONArray();
					    commentsArr = convertToArray(rs);
					    feed_data.put("comments_arr", commentsArr);
					    responseArr.put(feed_data);
					    
				    }
				    
				    
			    	resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,responseArr.toString().getBytes("UTF-8"));
				    	
				}else if(requestObject.getString("action").equalsIgnoreCase("get_unread_messages")){
					String user_id_to = requestObject.getString("user_id_to");
					
					String sql = "SELECT * FROM CHAT_DATA,USER_DATA WHERE CHAT_DATA.user_id_to='"+user_id_to+"' AND CHAT_DATA.chat_status = 'unread' WHERE CHAT_DATA.user_id_from = USER_DATA.user_id GROUP BY CHAT_DATA.user_id_from";
					
				    stmt = connection.prepareStatement(sql);
				    rs = stmt.executeQuery();
				    JSONArray dataArr = convertToArray(rs);
				    
				    
				    
			    	resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,dataArr.toString().getBytes("UTF-8"));
				    	
				}else if(requestObject.getString("action").equalsIgnoreCase("get_active_users")){
					MessengerSocket socket_instance = MessengerSocket.getInstance();
					Iterator it = socket_instance.active_clients.entrySet().iterator();
					JSONArray active_users = new JSONArray();
				    while (it.hasNext()) {
				        Map.Entry pair = (Map.Entry)it.next();
				        String key = (String) pair.getKey();
				        JSONObject active_user_data = new JSONObject();
				        String sql;
					    sql = "SELECT * FROM USER_DATA WHERE user_id='"+key+"'";
					    stmt = connection.prepareStatement(sql);
					    rs = stmt.executeQuery();
					    JSONArray data_arr = convertToArray(rs);
					    active_user_data.put(key, data_arr);
				        
				        active_users.put(active_user_data);
				    }
				    resp.setHeader("Cache-Control", "no-cache");
					sendResponse(resp,active_users.toString().getBytes("UTF-8"));
				}
				
	      
	    }
	    catch(JSONException e){
			e.printStackTrace();
		}
	    catch (SQLException sqlException) {
	      sqlException.printStackTrace();
	    }
	    catch (Exception e) {
		      e.printStackTrace();
		}
	    finally {
    	  if (rs != null) 
	        try {rs.close();} catch (SQLException e) {}
    	  if (stmt != null) 
		    try {stmt.close();} catch (SQLException e) {}
	      if (connection != null) 
	        try {connection.close();} catch (SQLException e) {}
	    }
	}
	
	
	
	 public static JSONArray convertToArray( ResultSet rs )
			    throws SQLException, JSONException
	  {
	    JSONArray json = new JSONArray();
	    ResultSetMetaData rsmd = rs.getMetaData();

	    while(rs.next()) {
	      int numColumns = rsmd.getColumnCount();
	      JSONObject obj = new JSONObject();

	      for (int i=1; i<numColumns+1; i++) {
	        String column_name = rsmd.getColumnName(i);

	        if(rsmd.getColumnType(i)==java.sql.Types.ARRAY){
	         obj.put(column_name, rs.getArray(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BIGINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BOOLEAN){
	         obj.put(column_name, rs.getBoolean(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.BLOB){
	         obj.put(column_name, rs.getBlob(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.DOUBLE){
	         obj.put(column_name, rs.getDouble(column_name)); 
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.FLOAT){
	         obj.put(column_name, rs.getFloat(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.INTEGER){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.NVARCHAR){
	         obj.put(column_name, rs.getNString(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.VARCHAR){
	         obj.put(column_name, rs.getString(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.TINYINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.SMALLINT){
	         obj.put(column_name, rs.getInt(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.DATE){
	         obj.put(column_name, rs.getDate(column_name));
	        }
	        else if(rsmd.getColumnType(i)==java.sql.Types.TIMESTAMP){
	        obj.put(column_name, rs.getTimestamp(column_name));   
	        }
	        else{
	         obj.put(column_name, rs.getObject(column_name));
	        }
	      }

	      json.put(obj);
	    }

	    return json;
	  }
	 
	 
	 private static void sendResponse(HttpServletResponse response, byte[] data){
			OutputStream out = null;
			try {

				response.setStatus( HttpServletResponse.SC_OK );
				response.setContentLength(data.length);
				out = response.getOutputStream();
				out.write(data);
				out.flush();
			} catch (IOException e) {
				System.out.println("Exception while sending response"+e);
			} finally {
				try{
					out.close();
				}catch (Exception e) {
				}
			}
		}


}
