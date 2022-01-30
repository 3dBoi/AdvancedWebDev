USE HacknDash;

INSERT INTO userlist (id, email, username, password) VALUES
    (1, 'mail@enteentelos.com', 'mail', '$2b$10$QbJAb.MgxQ15a3Vre7gOP.MF14xT/PwJnPJzThatm3CMpCO9xLQ/a'),
    (2, 'user@hshl.com', 'user', '$2b$10$zwEoCtcR.0bVB6dzHIJ/sOoQ3RaB9WeERm3YwMi39r8RUCmsf3qFO'),
    (3, 'munir.ali@hshl.de', 'Munir', '$2b$10$mYtyiGO0FezuKc7nPmU.ZeebP3LAC32q2zEkxeXig1QtDavbpj3Vu'),
    (4, 'bob@bob.com', 'BOb', '$2b$10$RbGtgKoRFndjJCXrEbpImOkcmGXjRKgskhHjiqXHLBXxXCM3EFCAa'),
    (5, 'christian@hshl.de', 'Chris', '$2b$10$5xmb6a0bn1cR.wkzPAVOW.KgVXKEkj7DhaB9Cp7nkYr/sVe0cGkfC'),
    (6, 'janiskarl@hshl.de', 'Janisch', '$2b$10$w.rXRkcpmphDn.qv5o0tN.j6CQF3JhuWOI.ZmlEsivQ1qzPQY4noe')
    (7, 'anton@hshl.de', 'AAAnton', '$2b$10$ODFVsmgbJUTUWgf3qVIzmu.s.ZYKUW5RdLjRUHxweZYja/t0Migr6')
;

INSERT INTO stats (id, userID, gamesplayed, score, time) VALUES
    (1, 3, 4, 100, 20),
    (2, 3, 4, 3259, 3259),
    (3, 3, 4, 2425, 2425),
    (5, 6, 11, 1551, 1551),
    (6, 6, 11, 47025, 27025),
    (7, 6, 11, 139663, 39663),
    (8, 2, 2, 92624, 32624),
    (9, 2, 2, 63295, 23295),
    (10, 6, 11, 1151, 1151),
    (11, 6, 11, 1456, 1456),
    (12, 6, 11, 1392, 1392),
    (13, 6, 11, 1504, 1504),
    (14, 6, 11, 1952, 1952),
    (15, 7, 1, 2385, 2385),
    (16, 6, 11, 2401, 2401),
    (17, 6, 11, 13905, 3905),
    (18, 3, 4, 1985, 1985),
    (19, 6, 11, 48384, 28384)
;

COMMIT;
