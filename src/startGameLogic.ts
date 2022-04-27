import PonyPanicApiClient from "./utils/PonyApiClient";
import {HeroAction} from "./enum/HeroAction";

export const startGameLogic = async () => {
  console.log('HELLO, This is the game logic')

  //example API call
  await PonyPanicApiClient.approveHeroTurn(HeroAction.NOTHING, null, {})
    .then(res => console.log('Example API call Yaaay: ', res))
    .catch(err => console.log('Example API call Noooo: ', err))

  while (true) {
    //game loop
    console.log('in game loop')
    break
  }

  console.log('end of game logic')
}
