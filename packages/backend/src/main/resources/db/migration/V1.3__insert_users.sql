-- Insert "The Road" by Cormac McCarthy with start date September 18th 2025

INSERT INTO users (username, email)
VALUES ('lsimanonok', 'leo@simanonok.com'),
        ('mcatalano', 'mattcat26@gmail.com'),
        ('sminix', 'supersam5699@gmail.com'),
        ('qurell', 'quinn@urell.com'),
        ('gharris', 'gabe@harris.com')
ON CONFLICT (username, email) DO NOTHING;