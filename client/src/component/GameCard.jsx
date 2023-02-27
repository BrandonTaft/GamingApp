import { useOutletContext } from 'react-router-dom';
import '../style/index.css';
export default function GameCard({games}) {
    const card = games.map(game => {
        return(
            <div key={game.id} className="flex-grow basis-1/3">
            
            {game.cover
                ?
                <div>
                    <img className='m-auto max-w-[180px]' src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover}.jpg`} />
                </div>
                :
                ""
            }
            <div className='text-white text-center'>{game.name}</div>
            </div>
        )
    })
    
return (
    <>
        {card}
    </>
)
}