package nus.iss.Backend.Backend.model;

import java.io.StringReader;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Register {
    
    // private int id;
    private String email;
    private String password;
    private boolean terms;


    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isTerms() {
        return terms;
    }
    public void setTerms(boolean terms) {
        this.terms = terms;
    }

    public static Register create(String json) {
        
        JsonReader reader = Json.createReader(new StringReader(json));
        JsonObject data = reader.readObject();
        
        final Register reg = new Register();
        reg.setEmail(data.getString("email"));
        reg.setPassword(data.getString("password"));
        reg.setTerms(data.getBoolean("false")); // how?

        return reg;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
        .add("email", email)
        .add("password", password)
        .add("terms", terms)
        .build();
    }

    public static Register createSql(SqlRowSet rs) {
        Register reg = new Register();
        reg.setEmail(rs.getString("email"));
        reg.setPassword(rs.getString("password"));
        reg.setTerms(rs.getBoolean("false"));
    
        return reg;
    }

    
}
