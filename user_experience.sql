/*
World table:
+-------------+-----------+---------+------------+--------------+
| name        | continent | area    | population | gdp          |
+-------------+-----------+---------+------------+--------------+
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
+-------------+-----------+---------+------------+--------------+
Output: 
+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+
*/

SELECT 
    name, population, area
FROM 
    world
WHERE                          --use WHERE clause in SQL to filter these records and get the target countries.
    area >= 3000000

UNION
/*
 According to the definition, a big country meets at least one of the following two conditions:
       1. It has an area of bigger than 3 million square km.
       2. It has a population of more than 25 million.
 So for the first condition, we can use the following code to get the big countries of this type.
 */
-- In addition, we can use below code to get big countries of more than 25 million people.
SELECT
    name, population, area
FROM 
    world
WHERE
    population >= 25000000
;

/*
 As most people may already come into mind, we can use OR to combine these two solutions for the two sub-problems together.
 */
