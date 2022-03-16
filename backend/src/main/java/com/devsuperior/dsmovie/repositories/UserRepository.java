package com.devsuperior.dsmovie.repositories;

import com.devsuperior.dsmovie.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email); //padrão do jpa que o nome já faz a busca pelo email, ou por outro nome que vc colocar que tenha no JPA

}
