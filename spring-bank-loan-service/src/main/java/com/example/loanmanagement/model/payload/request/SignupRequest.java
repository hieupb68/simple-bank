package com.example.loanmanagement.model.payload.request;

import com.example.loanmanagement.entity.Role;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<Role> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @Nullable
    private Integer isDeclared;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public Set<Role> getRole() {
        return this.role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public Integer getIsDeclared() {
        return isDeclared;
    }

    public void setIsDeclared(Integer isDeclared) {
        this.isDeclared = isDeclared;
    }
}
