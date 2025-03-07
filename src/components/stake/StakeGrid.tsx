import { ReactNode, useMemo } from 'react'
import styled from 'styled-components'

import StakeSection from '@/src/components/stake/StakeSection'
import { Chains } from '@/src/constants/chains'
import { contracts } from '@/src/constants/contracts'
import { StakingEnum } from '@/src/providers/stakingRewardsProvider'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { getExplorerUrl } from '@/src/utils/getExplorerUrl'

const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  flex-grow: 1;

  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    grid-template-columns: 1fr 1fr;
  }
`

const StakeGrid = ({ ...restProps }) => {
  const { appChainId } = useWeb3Connection()

  const stakePerChain = useMemo(
    () => ({
      [Chains.optimism]: [
        <StakeSection
          contractAddresses={{
            stakingAddress: contracts.STAKING_REWARDS.address[Chains.optimism],
            tokenAddress: contracts.AELIN_TOKEN.address[Chains.optimism],
          }}
          explorerUrl={getExplorerUrl(
            contracts.STAKING_REWARDS.address[Chains.optimism],
            appChainId,
          )}
          key={StakingEnum.AELIN}
          stakeType={StakingEnum.AELIN}
          textTooltip={
            'Staking AELIN gives a share of 29 AELIN/month in inflationary rewards + 2/3 of protocol deal fees. Note deal fees are temporarily custodied by the Aelin Council and will be distributed in the future.'
          }
          textTooltipAPY={
            'Estimation based on the total amount of rewards for a year and the total value staked in the contract.'
          }
          title={'Aelin staking'}
        />,

        <StakeSection
          contractAddresses={{
            stakingAddress: contracts.LP_STAKING_REWARDS.address[Chains.optimism],
            tokenAddress: contracts.LP_TOKEN.address[Chains.optimism],
          }}
          explorerUrl={getExplorerUrl(
            contracts.LP_STAKING_REWARDS.address[Chains.optimism],
            appChainId,
          )}
          key={StakingEnum.GELATO}
          stakeType={StakingEnum.GELATO}
          textTooltip={
            'Staking AELIN/ETH LP gives a share of 44 AELIN/month in inflationary rewards + 1/3 of deal fees. Note deal fees are temporarily custodied by the Aelin Council and will be distributed in the future.'
          }
          textTooltipAPY={
            'Estimation based on the total amount of rewards for a year and the total value staked in the contract. Trading fees from Uniswap not included.'
          }
          title={'AELIN/ETH staking'}
        />,
      ],
      [Chains.mainnet]: [
        <StakeSection
          contractAddresses={{
            stakingAddress: contracts.LP_STAKING_REWARDS.address[Chains.mainnet],
            tokenAddress: contracts.LP_TOKEN.address[Chains.mainnet],
          }}
          explorerUrl={getExplorerUrl(
            contracts.LP_STAKING_REWARDS.address[Chains.mainnet],
            appChainId,
          )}
          key={StakingEnum.UNISWAP}
          stakeType={StakingEnum.UNISWAP}
          textTooltip={
            'Staking AELIN/ETH LP gives a share of 50 AELIN/month in inflationary rewards.'
          }
          textTooltipAPY={
            'Estimation based on the total amount of rewards for a year and the total value staked in the contract. Trading fees from Uniswap not included.'
          }
          title={'AELIN/ETH staking'}
        />,
      ],
      [Chains.goerli]: [],
      [Chains.kovan]: [],
    }),
    [appChainId],
  )

  const stakeBoxes = useMemo(() => stakePerChain[appChainId], [appChainId, stakePerChain])

  return <Wrapper {...restProps}>{stakeBoxes.map((box: ReactNode) => box)}</Wrapper>
}

export default StakeGrid
