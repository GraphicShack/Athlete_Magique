// Responsabilité : le tableau des points par course.

import { Tableau } from './TableauPointage.styles.js';

// Affiche une ligne par course avec les points de la 1re pis 2e place.
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
