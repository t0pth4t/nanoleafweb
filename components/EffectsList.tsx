import {useEffect, useState} from "react";
import {getEffectsList, putSelectEffect} from "../helpers/client";

export default function EffectsList() {
    const [effects, setEffects] = useState<string[]>([]);

    useEffect(() => {
        const getEffects = async () => {
            try {
                const effects = await getEffectsList();
                setEffects(effects);
            }catch (e) {
                console.error(e);
                alert(`Failed to get effects: ${e.message}`);
            }
        }
        if(localStorage.getItem('auth_token')) {
            getEffects();
        }
    }, []);

    const setEffect = (effect: string) => {
        putSelectEffect(effect);
    }

    const effectList = effects.map(effect =>
        <li key={effect}>
            <button onClick={()=> setEffect(effect)} id={effect}>{effect}</button>
        </li>
    );

    return (
        <div>
            <h1>Effects</h1>
            <ul>
                {effectList}
            </ul>
        </div>
    )
}