/*
 * TableauPointage.jsx : le tableau des points gagnés à chaque course.
 *
 * Responsabilité : afficher le barème reçu, une ligne par course.
 *
 * Props :
 *   pointage : [{ course, premiere, deuxieme }] (voir services/regles.js)
 */
import { Tableau } from './TableauPointage.styles.js';

function TableauPointage({ pointage }) {
  return (
    <Tableau>
      <thead>
        <tr>
          <th scope="col">Course</th>
          <th scope="col">1re place</th>
          <th scope="col">2e place</th>
        </tr>
      </thead>
      <tbody>
        {pointage.map(({ course, premiere, deuxieme }) => (
          <tr key={course}>
            <th scope="row">Course {course}</th>
            <td>{premiere} pts</td>
            {/* « 1 pt », mais « 2 pts » */}
            <td>
              {deuxieme} {deuxieme > 1 ? 'pts' : 'pt'}
            </td>
          </tr>
        ))}
      </tbody>
    </Tableau>
  );
}

export default TableauPointage;
