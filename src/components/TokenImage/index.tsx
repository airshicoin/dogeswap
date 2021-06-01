import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import styled from 'styled-components'
import PlaceHolder from '../../assets/images/unknow.svg'
import EthereumLogo from '../../assets/images/ht-logo.png'

function isAddress(value: string) {
    try {
      return ethers.utils.getAddress(value.toLowerCase()).toLowerCase();
    } catch {
      return false
    }
}

const BAD_IMAGES: any = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img<{
    size: string,
}>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const DefaultLogo = styled.div<{
    size: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address = '', header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <Image {...rest} alt={''} src={PlaceHolder} size={size} />
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb') {
    address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  }

  if (address?.toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f') {
    address = '0xc011a72400e58ecd99ee497cf89e3775d4bd732f'
  }

  if (address?.toLowerCase() === '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f') {
    return (
      <DefaultLogo size={size} {...rest}>
        <img
          src={EthereumLogo}
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
            borderRadius: '24px',
          }}
          alt=""
        />
      </DefaultLogo>
    )
  }

  const path = `https://graph.dogeswap.com/static/images/tokens/${isAddress(address)}.png`
  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path.toLowerCase()}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}