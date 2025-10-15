-- Insert users
INSERT INTO
        users (username, email)
VALUES
        ('lsimanonok', 'leo@simanonok.com'),
        ('mcatalano', 'mattcat26@gmail.com'),
        ('sminix', 'supersam5699@gmail.com'),
        ('qurell', 'quinn@urell.com'),
        ('gharris', 'gabe@harris.com') ON CONFLICT (username) DO
UPDATE
SET
        email = EXCLUDED.email;

-- Insert books metadata only
INSERT INTO
        books (title, author, cover_id)
VALUES
        ('The Road', 'Cormac McCarthy', 14818120),
        (
                'The Origins and History of Consciousness',
                'Erich Neumann',
                7148804
        ),
        (
                'A Brief History of Time',
                'Stephen Hawking',
                15104429
        ),
        ('The Alchemist', 'Paulo Coelho', 15121528),
        ('The Stranger', 'Albert Camus', 15118287),
        ('Meditations', 'Marcus Aurelius', 5559829),
        (
                'Mans Search for Meaning',
                'Viktor E. Frankl',
                15102812
        ),
        (
                'Gun Country: Gun Capitalism, Culture, and Control in Cold War America',
                'Andrew C. McKevitt',
                NULL
        ),
        (
                'A Testament of Hope: The Essential Writings and Speeches',
                'Martin Luther King Jr.',
                32251
        ),
        (
                'Anti-Intellectualism in American Life',
                'Richard Hofstadter',
                7162823
        ),
        (
                'The Sirens of Titan',
                'Kurt Vonnegut Jr.',
                15130491
        ),
        (
                'Capital: A Crtique of Political Economy Volume 1',
                'Karl Marx',
                14923999
        ),
        (
                'Manufacturing Consent: The Political Economy of the Mass Media',
                'Edward S. Herman and Noam Chomsky',
                7900362
        ),
        ('Catch-22', 'Joseph Heller', 14925170) ON CONFLICT (title, author) DO NOTHING;

-- Insert reading history
INSERT INTO
        club_history (book_id, selected_by, started, finished)
VALUES
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'The Road'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'gharris'
                ),
                '2025-09-18',
                '2025-10-14'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'The Origins and History of Consciousness'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'lsimanonok'
                ),
                '2023-04-04',
                '2023-12-22'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'A Brief History of Time'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'mcatalano'
                ),
                '2024-01-01',
                '2024-02-29'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'The Alchemist'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'lsimanonok'
                ),
                '2024-02-29',
                '2024-03-26'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'The Stranger'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'mcatalano'
                ),
                '2024-03-26',
                '2024-04-23'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Meditations'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'lsimanonok'
                ),
                '2024-04-23',
                '2024-06-16'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Mans Search for Meaning'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'mcatalano'
                ),
                '2024-10-31',
                '2024-11-10'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Gun Country: Gun Capitalism, Culture, and Control in Cold War America'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'qurell'
                ),
                '2024-11-10',
                '2024-12-12'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'A Testament of Hope: The Essential Writings and Speeches'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'lsimanonok'
                ),
                '2024-12-12',
                '2025-02-18'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Anti-Intellectualism in American Life'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'sminix'
                ),
                '2025-02-18',
                '2025-03-24'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'The Sirens of Titan'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'mcatalano'
                ),
                '2025-03-24',
                '2025-04-15'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Capital: A Crtique of Political Economy Volume 1'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'qurell'
                ),
                '2025-04-15',
                '2025-07-03'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Manufacturing Consent: The Political Economy of the Mass Media'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'lsimanonok'
                ),
                '2025-07-03',
                '2025-08-17'
        ),
        (
                (
                        SELECT
                                id
                        FROM
                                books
                        WHERE
                                title = 'Catch-22'
                ),
                (
                        SELECT
                                id
                        FROM
                                users
                        WHERE
                                username = 'sminix'
                ),
                '2025-08-17',
                '2025-09-15'
        ) ON CONFLICT (book_id) DO
UPDATE
SET
        started = EXCLUDED.started,
        finished = EXCLUDED.finished;