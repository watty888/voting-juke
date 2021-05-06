HOST="$MYSQL_PORT_3306_TCP_ADDR"
PORT="$MYSQL_PORT_3306_TCP_PORT"
USER="root"
PASSWORD="$MYSQL_ENV_MYSQL_ROOT_PASSWORD"
DATABASE="$MYSQL_ENV_MYSQL_DATABASE"
SQL_PATH="${SQL_PATH:-/var/www/Config/sql}"
echo $SQL_FILE;
SQL_FILE="${SQL_FILE:-database.sql}"
echo $SQL_FILE;

until echo '\q' | mysql -h"$HOST" -P"$PORT" -u"$USER" -p"$PASSWORD" $DATABASE; do
    >&2 echo "MySQL is unavailable - sleeping"
    sleep 1
done

while [ ! -d $SQL_PATH ]; do
    >&2 echo "Data is unavailable - sleeping"
    sleep 1;
done;

>&2 echo "MySQL and Data are up - executing command"

cat $SQL_PATH/$SQL_FILE | mysql -h"$HOST" -P"$PORT" -u"$USER" -p"$PASSWORD" $DATABASE