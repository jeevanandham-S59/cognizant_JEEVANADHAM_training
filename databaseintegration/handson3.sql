SELECT s.student_id,
       s.first_name,
       s.last_name
FROM students s
JOIN enrollments e
ON s.student_id = e.student_id
GROUP BY s.student_id, s.first_name, s.last_name
HAVING COUNT(e.course_id) >
(
    SELECT AVG(course_count)
    FROM
    (
        SELECT COUNT(course_id) AS course_count
        FROM enrollments
        GROUP BY student_id
    ) avg_table
);
SELECT p.*
FROM professors p
WHERE salary =
(
    SELECT MAX(salary)
    FROM professors p2
    WHERE p.department_id = p2.department_id
);
SELECT *
FROM
(
    SELECT d.department_id,
           d.dept_name,
           AVG(p.salary) AS avg_salary
    FROM departments d
    JOIN professors p
    ON d.department_id = p.department_id
    GROUP BY d.department_id, d.dept_name
) dept_avg
WHERE avg_salary > 85000;

--TASK 2

CREATE OR REPLACE VIEW vw_student_enrollment_summary AS
SELECT
    s.student_id,
    s.first_name || ' ' || s.last_name AS student_name,
    d.dept_name,
    COUNT(e.course_id) AS total_courses,
    ROUND(
        AVG(
            CASE
                WHEN e.grade = 'A' THEN 4
                WHEN e.grade = 'B' THEN 3
                WHEN e.grade = 'C' THEN 2
                WHEN e.grade = 'D' THEN 1
                WHEN e.grade = 'F' THEN 0
                ELSE NULL
            END
        ), 2
    ) AS gpa
FROM students s
LEFT JOIN departments d
    ON s.department_id = d.department_id
LEFT JOIN enrollments e
    ON s.student_id = e.student_id
GROUP BY
    s.student_id,
    s.first_name,
    s.last_name,
    d.dept_name;

CREATE OR REPLACE VIEW vw_course_stats AS
SELECT
    c.course_name,
    c.course_code,
    COUNT(e.enrollment_id) AS total_enrollments,
    ROUND(
        AVG(
            CASE
                WHEN e.grade = 'A' THEN 4
                WHEN e.grade = 'B' THEN 3
                WHEN e.grade = 'C' THEN 2
                WHEN e.grade = 'D' THEN 1
                WHEN e.grade = 'F' THEN 0
                ELSE NULL
            END
        ),
        2
    ) AS avg_gpa
FROM courses c
LEFT JOIN enrollments e
ON c.course_id = e.course_id
GROUP BY
    c.course_id,
    c.course_name,
    c.course_code;

SELECT *
FROM vw_student_enrollment_summary
WHERE GPA > 3;	

UPDATE vw_student_enrollment_summary
SET student_name='Arjun Kumar'
WHERE student_id=1;

-- Task 42 Observation:
-- UPDATE failed because vw_student_enrollment_summary contains
-- GROUP BY, aggregate functions (COUNT, AVG), and JOINs.
-- PostgreSQL does not allow automatic updates on such views.
-- To make this view updatable, an INSTEAD OF UPDATE trigger
-- or a rewrite rule would be required.

DROP VIEW IF EXISTS vw_course_stats;

DROP VIEW IF EXISTS vw_student_enrollment_summary;

---TASK 3

ROLLBACK;

CREATE OR REPLACE FUNCTION fn_enroll_student
(
p_student_id INT,
p_course_id INT,
p_enrollment_date DATE
)

RETURNS VOID

LANGUAGE plpgsql

AS
$$

BEGIN

IF EXISTS
(
SELECT 1
FROM enrollments
WHERE student_id=p_student_id
AND course_id=p_course_id
)

THEN

RAISE EXCEPTION 'Student already enrolled';

END IF;

INSERT INTO enrollments
(
student_id,
course_id,
enrollment_date
)

VALUES
(
p_student_id,
p_course_id,
p_enrollment_date
);

END;

$$;

SELECT fn_enroll_student(2,2,'2024-06-01');


BEGIN;

UPDATE students
SET department_id=99
WHERE student_id=2;

INSERT INTO department_transfer_log
(
student_id,
old_department,
new_department
)

VALUES
(
2,
1,
99
);

ROLLBACK;


BEGIN;

INSERT INTO enrollments
(student_id,course_id,enrollment_date)

VALUES
(3,2,'2024-07-01');

SAVEPOINT first_insert;

INSERT INTO enrollments
(student_id,course_id,enrollment_date)

VALUES
(999,2,'2024-07-01');

ROLLBACK TO SAVEPOINT first_insert;

COMMIT;

