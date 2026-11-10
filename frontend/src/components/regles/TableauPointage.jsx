import styled from 'styled-components';

/**
 * Barème des points de chaque course.
 * pointage : [{ course, premiere, deuxieme }]
 */
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

const Tableau = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.texte.sm};

  th,
  td {
    padding: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(3)};
    text-align: left;
    border-bottom: ${({ theme }) => theme.bordures.fine};
  }

  thead th {
    color: ${({ theme }) => theme.couleurs.gris700};
    font-weight: ${({ theme }) => theme.graisses.forte};
  }

  tbody th {
    font-weight: ${({ theme }) => theme.graisses.forte};
  }
`;

export default TableauPointage;
