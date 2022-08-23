drop database mock_tts_10;
create database mock_tts_10;

use mock_tts_10;

create table roles(
id int primary key ,
name varchar(100) not null unique,
description text 
);
create table status(
id int primary key auto_increment,
code varchar(200) not null,
name nvarchar(200) not null,
description text
);

create table accounts(
id int primary key auto_increment,
username varchar(200) not null unique,
password varchar(500) not null,
create_at datetime default(now()) ,
update_at datetime default(now()),
is_delete bit  default(0)
);

create table accounts_roles(
account_id int not null,
role_id int not null,
primary key(account_id,role_id),
foreign key(account_id) references accounts(id),
foreign key(role_id) references roles(id)

);

create table employees(
id int primary key auto_increment,
full_name text not null ,
image text ,
email varchar(100) not null unique,
phone varchar (20) not null unique,
address nvarchar(500) not null ,

account_id int not null,
foreign key(account_id) references accounts(id)

);

create table transport_companies(
id int primary key auto_increment,
code varchar(200) not null unique,
name text not null,
email varchar(200) not null unique,
phone varchar(20) not null ,
address text not null,
account_id int not null,
create_at datetime default(now()) ,
update_at datetime default(now()),
is_delete bit  default(0),
foreign key(account_id) references accounts(id)

);

create table inventories(
id int primary key auto_increment,
code varchar(100) not null unique,
name text not null ,
address text not null,
create_at datetime default(now()) ,
update_at datetime ,
is_delete bit  default(0)

);
create table suppliers(
id int primary key auto_increment,
code varchar(100) not null unique,
name text not null ,
email varchar(100) not null unique,
phone varchar(20) not null unique,
address text not null ,
account_id int not null,
create_at datetime default(now()) ,
update_at datetime ,
is_delete bit  default(0),
foreign key(account_id) references accounts(id)

);
create table inventories_accounts(
account_id int not null,
inventory_id int not null,
primary key(account_id,inventory_id),
foreign key(account_id) references accounts(id),
foreign key(inventory_id) references inventories(id)
);

create table categories(
id int primary key auto_increment,
name nvarchar(500) not null,
description text 
);

create table products(
id int primary key auto_increment,
code varchar(100) not null unique,
name text not null,
description text  ,
status_id int default(0),
supplier_id int not null,
account_id int not null,
create_at datetime default(now()) ,
update_at datetime ,
is_delete bit  default(0),
foreign key(supplier_id) references suppliers(id),
foreign key(status_id) references status(id),
foreign key(account_id) references accounts(id)


);

create table options(
id int primary key auto_increment,
product_id int not null,
name nvarchar(200) not null ,
foreign key(product_id) references products(id)
);
create table option_values(
id int primary key auto_increment,
 option_id int not null,
-- product_id int not null,
name nvarchar(200) not null,
foreign key(option_id) references options(id)
-- foreign key(product_id) references options(product_id)
);

create table product_variants(
id int primary key auto_increment,
code varchar(100) not null unique,
product_id int not null,
name nvarchar(200) not null,
image text ,
wholesale_price decimal(20,2)  default (0),
sale_price decimal(20,2)  default (0),
import_price decimal(20,2)  default (0),
foreign key(product_id) references products(id)

);
create table product_variant_options(
id int primary key auto_increment ,
variant_id int not null,
option_value_id int not null,
foreign key(option_value_id) references option_values(id),
foreign key(variant_id) references product_variants(id)
);


create table categories_products(
product_id int not null,
category_id int not null,
primary key(product_id,category_id),
foreign key(product_id) references products(id),
foreign key(category_id) references categories(id)
);



create table inventoies_product_variant(
inventory_id int not null,
product_variant_id int not null,
qantity int  default(0),
primary key(inventory_id,product_variant_id),
foreign key(inventory_id) references inventories(id),
foreign key(product_variant_id) references product_variants(id)
);

create table contacts(
id int primary key auto_increment,
code varchar(100) not null  unique,
supplier_id int not null,
status_id int  default(0),
account_id int not null,
create_at datetime default(now()) ,
update_at datetime ,
is_delete bit  default(0),
foreign key(account_id) references accounts(id),
foreign key(supplier_id) references suppliers(id),
foreign key(status_id) references status(id)

);

create table details_contacts(
id int primary key auto_increment,
contact_id int not null,
product_variant_id int not null,
quantity int  default(0),
foreign key (contact_id) references contacts(id),
foreign key (product_variant_id) references product_variants(id)
);

create table imports(
id int primary key auto_increment,
contact_id int not null,
transport_company_id int not null,
status_id int not null,
account_id int not null,
create_at datetime default(now()),
update_at datetime ,
is_delete bit  default(0),
foreign key(contact_id) references contacts(id),
foreign key(account_id) references accounts(id),
foreign key(status_id) references status(id),
foreign key(transport_company_id) references transport_companies(id)
);
create table details_imports(
id int primary key auto_increment,
import_id int not null,
product_variant_id int not null,
quantity int  default(0),
foreign key(import_id) references imports(id),
foreign key(product_variant_id) references product_variants(id)
);


create table exports(
id int primary key auto_increment,
export_inventory_id int not null,

receive_inventory_id int not null,
status_id int not null default(0),
transport_company_id int not null,
account_id int not null,
create_at datetime default(now()) ,
update_at datetime ,
is_delete bit  default(0),
foreign key(account_id) references accounts(id),
foreign key(receive_inventory_id) references inventories(id),
foreign key(export_inventory_id) references inventories(id),
foreign key(status_id) references status(id),
foreign key(transport_company_id) references transport_companies(id)

);


create table details_exports(
id int primary key auto_increment,
export_id int not null,
product_variant_id int not null,
quantity int  default(0),
foreign key(export_id) references exports(id),
foreign key(product_variant_id) references product_variants(id)
);


create table actions(
id int primary key auto_increment,
code varchar(20) not null unique,
description text 
);

create table logs(
id int primary key auto_increment,
account_id int not null,
action_id int not null,
target_id int not null,
foreign key(account_id) references accounts(id),
foreign key(action_id) references actions(id)

);



create table exports_status(
id int primary key auto_increment,
export_id int not null,
status_id int not null,
foreign key(export_id) references exports(id),
foreign key(status_id) references status(id),
create_at datetime  default(now())
);
create table imports_status(
id int primary key auto_increment,
import_id int not null,
status_id int not null,
foreign key(import_id) references imports(id),
foreign key(status_id) references status(id),
create_at datetime  default(now())
);
create table contacts_status(
id int primary key auto_increment,
contact_id int not null,
status_id int not null,
foreign key(contact_id) references contacts(id),
foreign key(status_id) references status(id),
create_at datetime  default(now())
)


ALTER TABLE suppliers
    ADD COLUMN status_transaction bit  default(0);

ALTER TABLE suppliers
    MODIFY COLUMN code varchar(100) unique;

CREATE TABLE supplier_seqId
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);
DELIMITER $$
CREATE TRIGGER tg_supplier_insert
    BEFORE INSERT ON suppliers
    FOR EACH ROW
    IF NEW.code is null or NEW.code = '' THEN
begin
INSERT INTO supplier_seqId VALUES (NULL);
SET NEW.code = CONCAT('SUPP', LPAD(LAST_INSERT_ID(), 5, '0'));
end;
end if $$
DELIMITER ;

