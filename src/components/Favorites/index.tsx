import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { ADD_TO_MY_FAVORITES } from '../../apollo/mutations/addToMyFavorites';
import { useMutation } from '@apollo/client';
import { addToFavorite, addToFavoriteVariables } from '../../apollo/mutations/__generated__/addToFavorite';
import { useUserContext } from '../../contexts/user';

type FavoriteProps = {
  movieId: number,
  style?: boolean,
};

const styleCSS: React.CSSProperties = {
  position: "absolute",
  top: "5",
  right: "10",
  cursor: 'pointer'
};

const Favorite = ({ movieId, style }: FavoriteProps) => {

  const { user, setUser } = useUserContext();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [addToFavorite, { error, data, loading }] = useMutation<addToFavorite, addToFavoriteVariables>(ADD_TO_MY_FAVORITES, {
    onCompleted: (data) => {
      console.log(data)
      setIsFavorite(true);
      setUser({
        ...user,
        myFavorites: [...user.myFavorites, data.addToMyFavorites?.id]
      })

      // ajouter l'id du movie que l'on vient d'ajouter au favoris
      // ou faire un refetch de getMyFavoriteMovies dans <UserSignin />
    }
  })


  const handleFavorite = () => {
    console.log("j'ai cliqué")
    addToFavorite({ variables: { movieId } });
  }

  useEffect(() => {
    // code une fonction
    // se lance une seule fois si dépendance [] est vide
    // se lance à chaque fois qu'on reçois des movieId, ou des que notre array de favoris
    if (user.myFavorites?.includes(movieId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }


  }, [user.myFavorites, movieId]);

  console.log(user, 'DONNEES DE USER')

  // j'initialise une constante Component qui sera soit mon coeur plein ou mon coeur vide 
  // suivant si je suis en favoris ou pas.
  const FavoriteMovie = isFavorite ? FavoriteIcon : FavoriteBorderIcon;

  return (
    <Tooltip title={isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris"} placement="top">
      <FavoriteMovie style={style ? styleCSS : {cursor: 'pointer'}} fontSize='large' color='error' onClick={() => handleFavorite()} />
    </Tooltip>
  )
};

export default Favorite;