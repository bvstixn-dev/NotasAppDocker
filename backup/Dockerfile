    FROM postgres:15

    WORKDIR /app

    COPY backup.sh /app/backup.sh

    RUN chmod +x /app/backup.sh

    CMD ["bash", "-c", "while true; do ./backup.sh; sleep 60; done"]
