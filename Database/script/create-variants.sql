select table1.*,table2.options_id,table2.option_name,table2.option_value_name from (SELECT product_id,options.id as options_id, options.name as option_name,option_values.name as option_value_name  FROM options inner join option_values on option_values.option_id=options.id) as table1 
cross join (SELECT product_id,options.id as options_id, options.name as option_name,option_values.name as option_value_name  FROM options inner join option_values on option_values.option_id=options.id ) as table2 on table2.options_id!=	table1.options_id
where table1.options_id<table2.options_id;

