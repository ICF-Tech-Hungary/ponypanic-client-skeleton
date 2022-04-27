import {HeroAction} from "../enum/HeroAction";
import callEndpoint from "./callEndpoint";
import AuthTokenContainer from "../model/AuthTokenContainer";
import {HEADER_NAME_MAP_TOKEN, HEADER_NAME_PLAYER_TOKEN, HEADER_NAME_STORY_PLAYTHROUGH_TOKEN} from "./headers";


const basePath = 'https://ponypanic.io/playGameApi/v1'

//Use https://ponypanic.io/docs to create the clients of the other endpoints

function composeHeaders(tokens: AuthTokenContainer): Record<string, any> {
  const headers = {}

  if (tokens.playerToken) {
    headers[HEADER_NAME_PLAYER_TOKEN] = tokens.playerToken
  }
  if (tokens.mapToken) {
    headers[HEADER_NAME_MAP_TOKEN] = tokens.mapToken
  }
  if (tokens.storyPlaythroughToken) {
    headers[HEADER_NAME_STORY_PLAYTHROUGH_TOKEN] = tokens.storyPlaythroughToken
  }

  return headers
}

const approveHeroTurn = async (action: HeroAction, heroId: number | null, tokens: AuthTokenContainer): Promise<Record<string, unknown>> => {
  const headers = composeHeaders(tokens)

  return callEndpoint<Record<string, unknown>>({
    url: `${basePath}/play/approveHeroTurn`,
    method: "post",
    headers: headers,
    data: {
      action: action,
      heroId: heroId
    }
  }).then(res => {
    return res.data
  })
}

const PonyPanicApiClient = {
  approveHeroTurn
}

export default PonyPanicApiClient