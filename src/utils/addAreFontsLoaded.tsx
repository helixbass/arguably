import {SimplePropsAdder, flowMax, addStateHandlers} from 'ad-hok'
import {addEffectOnMount, cleanupProps} from 'ad-hok-utils'
import FontFaceObserver from 'fontfaceobserver'

type AddAreFontsLoaded = (
  fontFamilies: string[],
) => SimplePropsAdder<{
  areFontsLoaded: boolean
}>

const addAreFontsLoaded: AddAreFontsLoaded = (fontFamilies) => {
  const fontsToWatch = fontFamilies.map(
    (fontFamily) => fontFamily.split(',')[0],
  )
  return flowMax(
    addStateHandlers(
      {
        areFontsLoaded: false,
      },
      {
        onFontsLoaded: () => () => ({
          areFontsLoaded: true,
        }),
      },
    ),
    addEffectOnMount(({onFontsLoaded}) => () => {
      Promise.all(
        fontsToWatch.map((fontToWatch) =>
          new FontFaceObserver(fontToWatch).load(),
        ),
      ).then(onFontsLoaded)
    }),
    cleanupProps(['onFontsLoaded']),
  )
}

export default addAreFontsLoaded
