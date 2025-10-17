INSERT INTO users (username, email)
VALUES ('lsimanonok', 'leo@simanonok.com'),
        ('mcatalano', 'mattcat26@gmail.com'),
        ('sminix', 'supersam5699@gmail.com'),
        ('qurell', 'quinn@urell.com'),
        ('gharris', 'gabe@harris.com')
ON CONFLICT (username) DO UPDATE
        SET username = EXCLUDED.username,
                email = EXCLUDED.email;

INSERT INTO books (title, author, started, finished, selected_by)
VALUES ('The Road', 'Cormac McCarthy', '2025-09-18', NULL, (SELECT id FROM users WHERE username = 'gharris')),
        ('The Origins and History of Consciousness', 'Erich Neumann', '2023-04-04', '2023-12-22', (SELECT id FROM users WHERE username = 'lsimanonok')),
        ('A Brief History of Time', 'Stephen Hawking', '2024-01-01', '2024-02-29', (SELECT id FROM users WHERE username = 'mcatalano')),
        ('The Alchemist', 'Paulo Coelho', '2024-02-29', '2024-03-26', (SELECT id FROM users WHERE username = 'lsimanonok')),
        ('The Stranger', 'Albert Camus', '2024-03-26', '2024-04-23', (SELECT id FROM users WHERE username = 'mcatalano')),
        ('Meditations', 'Marcus Aurelius', '2024-04-23', '2024-06-16', (SELECT id FROM users WHERE username = 'lsimanonok')),
        ('Mans Search for Meaning', 'Viktor E. Frankl', '2024-10-31', '2024-11-10', (SELECT id FROM users WHERE username = 'mcatalano')),
        ('Gun Country: Gun Capitalism, Culture, and Control in Cold War America', 'Andrew C. McKevitt', '2024-11-10', '2024-12-12', (SELECT id FROM users WHERE username = 'qurell')),
        ('A Testament of Hope: The Essential Writings and Speeches', 'Martin Luther King Jr.', '2024-12-12', '2025-02-18', (SELECT id FROM users WHERE username = 'lsimanonok')),
        ('Anti-Intellectualism in American Life', 'Richard Hofstadter', '2025-02-18', '2025-03-24', (SELECT id FROM users WHERE username = 'sminix')),
        ('The Sirens of Titan', 'Kurt Vonnegut Jr.', '2025-03-24', '2025-04-15', (SELECT id FROM users WHERE username = 'mcatalano')),
        ('Capital: A Crtique of Political Economy Volume 1', 'Karl Marx', '2025-04-15', '2025-07-03', (SELECT id FROM users WHERE username = 'qurell')),
        ('Manufacturing Consent: The Political Economy of the Mass Media', 'Edward S. Herman and Noam Chomsky', '2025-07-03', '2025-08-17', (SELECT id FROM users WHERE username = 'lsimanonok')),
        ('Catch-22', 'Joseph Heller', '2025-08-17', '2025-09-15', (SELECT id FROM users WHERE username = 'sminix'))
ON CONFLICT (title, author) DO UPDATE
        SET title = EXCLUDED.title,
                author = EXCLUDED.author,
                started = EXCLUDED.started,
                finished = EXCLUDED.finished,
                selected_by = EXCLUDED.selected_by;
