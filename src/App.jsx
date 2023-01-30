import { useEffect, useState } from "react";

const App = () => {
    
    const [languages, setLanguages] = useState([]);
    const [form, setForm] = useState({
        souce: "Hello, world",
        output: "Привет, мир!",
        lang: "ru"
    });


    useEffect(() => {
        fetch ("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setLanguages(data.data.languages);
        });
    }, []);

    const LanguageOptions = languages.map(({ language }) => {
        return (
            <option key={language} value={language}>
                {item.language}
            </option>
        )
    })

    const onClickTranslateHandle = () => {

        const body = {
            q: "Hello my friends",
            target: "ru",
            source: "en",
        };

        fetch ("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'Accept-Encoding': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
            },
            body: JSON.stringify(body)
        })
        
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    // console.log(import.meta.env.VITE_API_KEY);

    return (
        <section>
            <div className="container">
                <div className="wrapper">
                    <h1>Translate</h1>
                    
                    <div className="form">

                        <div className="form_left">
                            <textarea name="source" cols="30" rows="10">
                                Hello, world!
                            </textarea>
                        </div>

                        <div className="form_right">
                            <select name="lang">
                                {LanguageOptions}
                            </select>

                            <textarea name="output" cols="30" rows="10">
                                Привет, мир!
                            </textarea>
                        </div>

                    </div>

                    <button onClick={onClickTranslateHandle}>Translate Now</button>
                </div>
            </div>
        </section>
    )
}

export default App;