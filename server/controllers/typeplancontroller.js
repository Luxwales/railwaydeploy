import { pool } from '../config/config.js'

export async function getTypeplans() {
    const [rows] = await pool.query("SELECT * from typeplans")
    return rows
}

export async function getTypeplan(id) {
    const [rows] = await pool.query(`
    SELECT * 
    from typeplans
    WHERE idType = ?
    `, [id]) 
    return rows[0]
}

export async function createTypeplan(planNumber, description, planType) {
    const [result] = await pool.query(`
    INSERT INTO typeplans (planNumber, description, planType)
    VALUES (?, ?, ?)
    `, [planNumber, description, planType])

    const id = result.insertId
    return getTypeplan(id)
}

// Test - for nested Json within Table to access properties

export async function getTypeplansArchitects() {
    const [rows] = await pool.query(`
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT('id', typeplans.idType, 'planNumber', typeplans.planNumber, 'description', typeplans.description, 'category', typeplan_types.category,
            'Architects', JSON_OBJECT('id', architects.designer_id, 'name', architects.name, 'initials', architects.drawingInitials)
        ))
        FROM
            typeplans
            LEFT OUTER JOIN typeplan_types ON typeplans.planType = typeplan_types.id
            LEFT OUTER JOIN  ( architect_typeplans 
            INNER JOIN architects ON  architect_typeplans.designer_id = architects.designer_id)
            ON typeplans.idType = architect_typeplans.typeplan_id
    `)
    return rows
}
