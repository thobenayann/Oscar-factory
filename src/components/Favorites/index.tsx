import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';

import { useUserContext } from '../../contexts/user';

import { ADD_TO_MY_FAVORITES } from '../../apollo/mutations/addToMyFavorites';
import { addToFavorite, addToFavoriteVariables } from '../../apollo/mutations/__generated__/addToFavorite';
import { RemoveToMyFavorites, RemoveToMyFavoritesVariables } from '../../apollo/mutations/__generated__/RemoveToMyFavorites';
import { REMOVE_TO_MY_FAVORITES } from '../../apollo/mutations/removeToMyFavorites';

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

  const [addToFavorite] = useMutation<addToFavorite, addToFavoriteVariables>(ADD_TO_MY_FAVORITES, {
    onCompleted: (data) => {
      setIsFavorite(true);
      setUser({
        ...user,
        myFavorites: [...user.myFavorites, data.addToMyFavorites?.id]
      })
    }
  })

  const [removeToFavorite] = useMutation<RemoveToMyFavorites, RemoveToMyFavoritesVariables>(REMOVE_TO_MY_FAVORITES, {
    onCompleted: (data) => {
      setIsFavorite(false);
      setUser({
        ...user,
        myFavorites: user.myFavorites.filter(movieId => movieId !== data.removeToMyFavorites?.id)
      })
    }
  })

  const handleFavorite = (isFavorite: boolean) => {
    if(!isFavorite) {
      addToFavorite({ variables: { movieId } });
    }
    if(isFavorite) {
      removeToFavorite({ variables: { movieId } });
    }
    
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

  // j'initialise une constante Component qui sera soit mon coeur plein ou mon coeur vide 
  // suivant si je suis en favoris ou pas.
  const FavoriteMovie = isFavorite ? FavoriteIcon : FavoriteBorderIcon;

  return (
    <Tooltip title={isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris"} placement="top">
      <FavoriteMovie style={style ? styleCSS : {cursor: 'pointer'}} fontSize='large' color='error' onClick={() => handleFavorite(isFavorite)} />
    </Tooltip>
  )
};

export default Favorite;