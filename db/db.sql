create schema booking

-- USER

CREATE TABLE if not exists booking.roles 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE booking.roles ADD code varchar NOT NULL;
ALTER TABLE booking.roles ADD "name" varchar NULL;

CREATE TABLE if not exists booking.users 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE booking.users ADD role_id      serial NOT NULL;
ALTER TABLE booking.users ADD email        varchar NOT NULL;
ALTER TABLE booking.users ADD "password"   varchar NOT NULL;
ALTER TABLE booking.users ADD telephone    varchar NOT NULL;
ALTER TABLE booking.users ADD "name"       varchar NULL;
ALTER TABLE booking.users ADD "uuid" uuid NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE booking.users ADD CONSTRAINT users_un UNIQUE (email);

--- Order / Comanda 
CREATE TABLE if not exists booking.orders 
(
    id  SERIAL PRIMARY KEY 
);
ALTER TABLE booking.orders ADD created_at timestamp NOT NULL;
ALTER TABLE booking.orders ADD modify_at timestamp NULL;
ALTER TABLE booking.orders ADD user_id      serial NOT NULL;
ALTER TABLE booking.orders ADD ticket_code varchar NOT NULL;
ALTER TABLE booking.orders ADD CONSTRAINT orders_ticket_un UNIQUE (ticket_code);



-- users fk
ALTER TABLE booking.users ADD CONSTRAINT fk_role_users FOREIGN KEY (role_id) REFERENCES booking.roles(id);

-- orders fk
ALTER TABLE booking.orders ADD CONSTRAINT fk_user_orders FOREIGN KEY (user_id) REFERENCES booking.users(id);
