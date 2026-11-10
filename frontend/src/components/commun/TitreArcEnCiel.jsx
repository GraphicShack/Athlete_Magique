import styled, { useTheme } from 'styled-components';

/**
 * Grand titre de page en capitales très grasses, chaque lettre d'une couleur différente,
 * comme les titres du livret de règles (« RACE! », « RECRUIT YOUR TEAM »).
 *
 * children : le texte du titre (une chaîne de caractères)
 *
 * Les lecteurs d'écran lisent le titre en entier (aria-label) et non lettre par lettre.
 */
function TitreArcEnCiel({ children, ...props }) {
  const { arcEnCiel } = useTheme();
  let rangCouleur = 0;

  return (
    <Titre aria-label={children} {...props}>
      {[...children].map((lettre, position) => {
        if (lettre === ' ') return ' ';
        const couleur = arcEnCiel[rangCouleur % arcEnCiel.length];
        rangCouleur += 1;
        return (
          <span key={position} aria-hidden="true" style={{ color: couleur }}>
            {lettre}
          </span>
        );
      })}
    </Titre>
  );
}

const Titre = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`;

export default TitreArcEnCiel;
