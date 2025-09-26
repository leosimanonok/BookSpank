-- Insert "The Road" by Cormac McCarthy with start date September 18th 2025

INSERT INTO users (username, email)
VALUES ('lsimanonok', 'leo@simanonok.com'),
        ('mcatalano', 'mattcat26@gmail.com'),
        ('sminix', 'supersam5699@gmail.com'),
        ('qurell', 'quinn@urell.com'),
        ('gharris', 'gabe@harris.com')
ON CONFLICT (username, email) DO NOTHING;

INSERT INTO books (title, author, started, finished, selected_by)
VALUES ('The Road', 'Cormac McCarthy', '2025-09-18', NULL, 'gharris'),
        ('The Origins and History of Consciousness', 'Erich Neumann', '2023-04-04', '2023-12-22', 'lsimanonok'),
        ('The Alchemist', 'Paulo Coelho', NULL, NULL, 'lsimanonok'),
        ('The Stranger', 'Albert Camus', NULL, NULL, 'mcatalano'),
        ('A Brief History of Time', 'Stephen Hawking', NULL, NULL, 'mcatalano'),
        ('Meditations', 'Marcus Aurelius', NULL, NULL, 'lsimanonok'),
        ('Mans Search for Meaning', 'Viktor Frankl', NULL, '2024-11-10', 'mcatalano'),
        ('Gun Country: Gun Capitalism, Culture, and Control in Cold War America', 'Andrew McKevitt', NULL, '2024-12-12', 'qurell'),
        ('Anti-Intellectualism in American Life', 'Richard Hofstadter', NULL, '2025-03-24', 'sminix'),
        ('The Sirens of Titan', 'Kurt Vonnegut Jr.', NULL, '2025-04-15', 'mcatalano'),
        ('Capital Vol. 1', 'Karl Marx', NULL, '2025-07-03', 'qurell'),
        ('Manufacturing Consent: The Political Economy of the Mass Media', 'Edward S. Herman and Noam Chomsky', NULL, '2025-08-17', 'lsimanonok'),
        ('A Testament of Hope: The Essential Writings and Speeches', 'Martin Luther King Jr.', NULL, NULL, 'lsimanonok'),
        ('Catch-22', 'Joseph Heller', NULL, '2025-09-15', 'sminix')
ON CONFLICT (title, author) DO NOTHING;

INSERT INTO books (title, author, started, finished, selected_by)
VALUES ()