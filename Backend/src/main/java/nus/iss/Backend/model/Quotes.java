package nus.iss.Backend.model;

import javax.persistence.*;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "quotes",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "id")
       })
public class Quotes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;

    private String text;
    
}
