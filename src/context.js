import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const cocktailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('a')
  const [cocktailsList, setCocktailsList] = useState([])
  const [isError, setIsError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cocktail, setCocktail] = useState({})

  const fetchCocktails = useCallback(async () => {
    setIsError(false)
    setIsEmpty(false)
    setIsLoading(true)
    try {
      const resp = await axios(`${cocktailsUrl}${searchValue}`)
      if (!resp) {
        setIsLoading(false)
        setIsError(true)
        return
      } else {
        const { drinks } = resp.data
        if (!drinks) {
          setIsLoading(false)
          setIsEmpty(true)
          return
        } else {
          const newCocktailLists = drinks.map((drink) => {
            const {
              idDrink: id,
              strDrink: name,
              strAlcoholic: isAlcoholic,
              strGlass: glassType,
              strDrinkThumb: image,
            } = drink
            return { id, name, isAlcoholic, glassType, image }
          })
          setCocktailsList(newCocktailLists)
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      console.log(error.response)
    }
  }, [cocktailsUrl, searchValue])

  const fetchCocktail = useCallback(
    async (id) => {
      setIsError(false)
      setIsEmpty(false)
      setIsLoading(true)
      try {
        const resp = await axios(`${singleCocktailUrl}${id}`)
        if (!resp) {
          setIsLoading(false)
          setIsError(true)
          return
        } else {
          const { drinks } = resp.data
          if (!drinks) {
            setIsLoading(false)
            setIsEmpty(true)
            return
          } else {
            const drink = drinks[0]
            const {
              idDrink: id,
              strDrink: name,
              strCategory: category,
              strGlass: glassType,
              strDrinkThumb: image,
              strAlcoholic: info,
              strInstructions: instructions,
            } = drink
            const keys = Object.keys(drink)
            const ingredientKeys = keys.filter((key) =>
              key.includes('strIngredient')
            )
            const ingredients = []
            let i = 0
            while (drink[ingredientKeys[i]]) {
              const item = drink[ingredientKeys[i]]
              ingredients.push(item)
              i++
            }
            setCocktail({
              name,
              category,
              glassType,
              image,
              info,
              ingredients,
              instructions,
            })
            setIsLoading(false)
          }
        }
      } catch (error) {
        setIsLoading(false)
        setIsError(true)
        console.log(error.response)
      }
    },
    [searchValue, singleCocktailUrl]
  )

  return (
    <AppContext.Provider
      value={{
        setSearchValue,
        cocktailsList,
        isLoading,
        isEmpty,
        isError,
        fetchCocktails,
        searchValue,
        fetchCocktail,
        cocktail,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
