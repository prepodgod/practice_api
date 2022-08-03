import "./charSearch.sass"
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMarvelService from "../../services/MarvelService";

import { Link } from "react-router-dom"
const CharSearch = () => {
    const [char, setChar] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(null, name)
            .then(onCharLoaded)
    }

    const { loading, error, getCharacterByName, clearError } = useMarvelService();
    console.log(char)
    const results = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/charact ers/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

 


return (

    <form className="char__form" onSubmit={handleSubmit(updateChar)}>
        <label className="char__find" >Or find a character by name:
            <fieldset className="char__search">
                <input className="char__input" placeholder="Enter name" {...register("name", { required: "This field is required", maxLength: 20 })} />
                <button className="button button__main" type="submit">
                    <div className="inner" >find</div>
                </button>
            </fieldset></label>
        {errors?.name && (
            <p className="char__result">{errors?.name?.message}</p>
        )}
        {results}
    </form>
)

}

export default CharSearch