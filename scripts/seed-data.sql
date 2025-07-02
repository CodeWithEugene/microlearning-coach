-- Insert sample courses
INSERT INTO public.courses (id, title, description, category, difficulty, duration, modules_count, rating, students_count, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Digital Marketing Essentials', 'Master the fundamentals of digital marketing in bite-sized lessons', 'Marketing', 'Beginner', 45, 12, 4.8, 1234, false),
('550e8400-e29b-41d4-a716-446655440002', 'Python Programming Basics', 'Learn Python programming through interactive micro-lessons', 'Technology', 'Beginner', 60, 15, 4.9, 2156, true),
('550e8400-e29b-41d4-a716-446655440003', 'Financial Literacy for Professionals', 'Build essential financial skills for career growth', 'Finance', 'Intermediate', 35, 10, 4.7, 987, true),
('550e8400-e29b-41d4-a716-446655440004', 'UI/UX Design Fundamentals', 'Create beautiful and functional user interfaces', 'Design', 'Beginner', 50, 14, 4.6, 1567, true),
('550e8400-e29b-41d4-a716-446655440005', 'Effective Communication Skills', 'Improve your communication in personal and professional settings', 'Personal Development', 'Beginner', 40, 11, 4.5, 2341, false),
('550e8400-e29b-41d4-a716-446655440006', 'Data Analysis with Excel', 'Master data analysis techniques using Microsoft Excel', 'Business', 'Intermediate', 55, 16, 4.4, 876, true);

-- Insert sample modules for Digital Marketing Essentials course
INSERT INTO public.modules (course_id, title, description, video_url, duration, order_index, xp_reward) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Introduction to Digital Marketing', 'Overview of digital marketing landscape and opportunities', 'https://www.youtube.com/watch?v=bixR-KIJKYM', 4, 1, 15),
('550e8400-e29b-41d4-a716-446655440001', 'Understanding Your Target Audience', 'Learn how to identify and analyze your ideal customers', 'https://www.youtube.com/watch?v=iUGnzT6NcZA', 5, 2, 20),
('550e8400-e29b-41d4-a716-446655440001', 'Content Marketing Basics', 'Create compelling content that drives engagement', 'https://www.youtube.com/watch?v=B1yb4Ufzm7s', 6, 3, 25),
('550e8400-e29b-41d4-a716-446655440001', 'Social Media Marketing Strategy', 'Develop effective social media campaigns', 'https://www.youtube.com/watch?v=R1ZVAoWzgRg', 7, 4, 30);

-- Insert sample modules for Python Programming Basics course
INSERT INTO public.modules (course_id, title, description, video_url, duration, order_index, xp_reward) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Python Installation and Setup', 'Get Python up and running on your computer', 'https://www.youtube.com/watch?v=YYXdXT2l-Gg', 3, 1, 10),
('550e8400-e29b-41d4-a716-446655440002', 'Variables and Data Types', 'Understanding Python variables and basic data types', 'https://www.youtube.com/watch?v=cQT33yu9pY8', 5, 2, 15),
('550e8400-e29b-41d4-a716-446655440002', 'Control Structures', 'Learn about if statements, loops, and conditions', 'https://www.youtube.com/watch?v=DZwmZ8Usvnk', 6, 3, 20),
('550e8400-e29b-41d4-a716-446655440002', 'Functions and Modules', 'Create reusable code with functions and modules', 'https://www.youtube.com/watch?v=9Os0o3wzS_I', 7, 4, 25);

-- Insert sample modules for UI/UX Design Fundamentals course
INSERT INTO public.modules (course_id, title, description, video_url, duration, order_index, xp_reward) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'Design Thinking Process', 'Introduction to user-centered design methodology', 'https://www.youtube.com/watch?v=_r0VX-aU_T8', 4, 1, 15),
('550e8400-e29b-41d4-a716-446655440004', 'User Research Fundamentals', 'Learn how to understand your users needs', 'https://www.youtube.com/watch?v=Qq3OiHQ-HCU', 5, 2, 20),
('550e8400-e29b-41d4-a716-446655440004', 'Wireframing and Prototyping', 'Create low and high-fidelity prototypes', 'https://www.youtube.com/watch?v=qpH7-KFWZRI', 6, 3, 25),
('550e8400-e29b-41d4-a716-446655440004', 'Visual Design Principles', 'Master color, typography, and layout', 'https://www.youtube.com/watch?v=a5KYlHNKQB8', 7, 4, 30);
