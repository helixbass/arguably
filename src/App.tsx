import React, {FC} from 'react'
import {flowMax, addDisplayName} from 'ad-hok'
import {addLayoutEffectOnMount} from 'ad-hok-utils'
import gsap from 'gsap'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {addRefsContext, addRefsContextProvider} from 'utils/refsContext'
import {addRefs} from 'utils/refs'
import addTypekit from 'utils/addTypekit'
import {gothicFontFamily, futuraFontFamily} from 'utils/typography'

const BLUR_FILTER_ID = 'blur-filter'
const DRUG_MASK_ID = 'drug-mask'

const FilterDef: FC = flowMax(
  addDisplayName('FilterDef'),
  addRefsContext,
  ({setRef}) => (
    <svg height="100vh" width="100vh">
      <defs>
        <filter id={BLUR_FILTER_ID}>
          <feGaussianBlur
            ref={setRef('blur')}
            stdDeviation={10}
            result="BLUR"
          />
          <feFlood
            ref={setRef('flood')}
            floodColor="#33ee22"
            floodOpacity={0.3}
            in="SourceGraphic"
            result="FLOOD"
          />
          <feMerge>
            <feMergeNode in="BLUR" />
            <feMergeNode in="FLOOD" />
          </feMerge>
        </filter>
        <mask id={DRUG_MASK_ID}>
          <rect x={0} y={0} fill="white" width="100%" height="100%" />
          <text
            ref={setRef('drug')}
            fill="black"
            x="50%"
            y="50%"
            textAnchor="middle"
          >
            drug
          </text>
        </mask>
      </defs>
      <image
        ref={setRef('image')}
        filter={`url(#${BLUR_FILTER_ID})`}
        href="matthew-henry-nvFpb_MMRj8-unsplash.jpg"
        height="100vh"
      />
      <rect
        ref={setRef('black')}
        x={0}
        y={0}
        fill={colors.black}
        width="100%"
        height="100%"
        mask={`url(#${DRUG_MASK_ID})`}
      />
    </svg>
  ),
)

const App: FC = flowMax(
  addDisplayName('App'),
  addTypekit('tmz1qbf'),
  addRefs,
  addRefsContextProvider,
  addLayoutEffectOnMount(({refs}) => () => {
    const {blur, image, drug, black} = refs

    gsap
      .timeline({paused: true})
      .set(black, {
        opacity: 0,
      })
      .set(drug, {
        fontFamily: gothicFontFamily,
        fontWeight: 800,
        textTransform: 'uppercase',
        fontSize: 235,
        letterSpacing: 1.5,
        y: 50,
      })
      .to(
        blur,
        {
          attr: {stdDeviation: 0},
          duration: 0.2,
          ease: 'linear',
        },
        0.6,
      )
      .to(
        black,
        {
          opacity: 1,
          duration: 0.01,
        },
        '+=0.2',
      )
      .addLabel('firstBlackDone')
      .set(
        drug,
        {
          fontFamily: futuraFontFamily,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: 155,
          letterSpacing: 0,
          y: 20,
        },
        '+=0.2',
      )
      .to(
        drug,
        {
          opacity: 0,
          duration: 0.01,
        },
        '+=0.3',
      )
      .to(
        image,
        {
          x: 50,
          y: 21,
          duration: 20,
          repeat: -1,
          yoyo: true,
        },
        'firstBlackDone',
      )
      .play()
  }),
  () => (
    <div css={styles.container}>
      <FilterDef />
      <span>Hello world!</span>
    </div>
  ),
)

export default App

const styles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    minHeight: '100vh',
  },
})
