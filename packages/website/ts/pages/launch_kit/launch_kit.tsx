import { colors, Link } from '@0x/react-shared';
import * as _ from 'lodash';
import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Footer } from 'ts/components/footer';
import { TopBar } from 'ts/components/top_bar/top_bar';
import { Button } from 'ts/components/ui/button';
import { Container } from 'ts/components/ui/container';
import { Image } from 'ts/components/ui/image';
import { Text } from 'ts/components/ui/text';
import { Dispatcher } from 'ts/redux/dispatcher';
import { Deco, Key, ScreenWidths, WebsitePaths } from 'ts/types';
import { constants } from 'ts/utils/constants';
import { Translate } from 'ts/utils/translate';
import { utils } from 'ts/utils/utils';

export interface LaunchKitProps {
    location: Location;
    translate: Translate;
    dispatcher: Dispatcher;
}

interface LaunchKitState {
    screenWidth: ScreenWidths;
}

const THROTTLE_TIMEOUT = 100;
const lighterBackgroundColor = '#222222';
const darkerBackgroundColor = '#1B1B1B';

interface Benefit {
    icon: string;
    description: string;
}
const BENEFITS_1: Benefit[] = [
    {
        icon: '/images/launch_kit/shared_liquidity.svg',
        description: 'Tap into and share liquidity with other relayers',
    },
    {
        icon: '/images/launch_kit/fork.svg',
        description: 'Fork and extend to support new modes of exchange',
    },
    {
        icon: '/images/launch_kit/enable_trading.svg',
        description: 'Enable trading for any ERC-20 or ERC-721 asset',
    },
];
const BENEFITS_2: Benefit[] = [
    {
        icon: '/images/launch_kit/secondary_market.svg',
        description: 'Quickly form a secondary market for your own token',
    },
    {
        icon: '/images/launch_kit/in_game_marketplace.svg',
        description: 'Seamlessly create an in-game marketplace for digital items and collectables',
    },
    {
        icon: '/images/launch_kit/local_market.svg',
        description: 'Easily build a 0x relayer for your local market',
    },
];

export class LaunchKit extends React.Component<LaunchKitProps, LaunchKitState> {
    private readonly _throttledScreenWidthUpdate: () => void;
    constructor(props: LaunchKitProps) {
        super(props);
        this.state = {
            screenWidth: utils.getScreenWidth(),
        };
        this._throttledScreenWidthUpdate = _.throttle(this._updateScreenWidth.bind(this), THROTTLE_TIMEOUT);
    }
    public componentDidMount(): void {
        window.addEventListener('resize', this._throttledScreenWidthUpdate);
        window.scrollTo(0, 0);
    }
    public componentWillUnmount(): void {
        window.removeEventListener('resize', this._throttledScreenWidthUpdate);
    }
    public render(): React.ReactNode {
        return (
            <div id="launchKit" className="clearfix" style={{ color: colors.grey500 }}>
                <DocumentTitle title="0x Launch Kit" />
                <TopBar
                    blockchainIsLoaded={false}
                    location={this.props.location}
                    isNightVersion={true}
                    style={{ backgroundColor: lighterBackgroundColor, position: 'relative' }}
                    translate={this.props.translate}
                />
                {this._renderHero()}
                {this._renderSection()}
                {this._renderCallToAction()}
                <Footer
                    backgroundColor={darkerBackgroundColor}
                    translate={this.props.translate}
                    dispatcher={this.props.dispatcher}
                />
            </div>
        );
    }
    private _renderHero(): React.ReactNode {
        const isSmallScreen = this.state.screenWidth === ScreenWidths.Sm;
        const smallButtonPadding = '12px 30px 12px 30px';
        const largeButtonPadding = '14px 60px 14px 60px';
        const left = 'col lg-col-6 md-col-6 col-12 lg-pl2 md-pl2 sm-pl0 sm-px3 sm-center';
        const flexClassName = isSmallScreen
            ? 'flex items-center flex-column justify-center'
            : 'flex items-center justify-center';
        return (
            <div className="clearfix pt4" style={{ backgroundColor: lighterBackgroundColor }}>
                <div className="mx-auto max-width-4 clearfix">
                    <div className={`${flexClassName} lg-pb4 md-pb4 sm-mb4`}>
                        <div className={left} style={{ color: colors.white }}>
                            <div
                                className="inline-block lg-align-middle md-align-middle sm-align-top"
                                style={{
                                    paddingLeft: isSmallScreen ? 0 : 12,
                                    lineHeight: '36px',
                                }}
                            >
                                <Text
                                    className="sm-pb2"
                                    fontFamily="Roboto"
                                    display="inline-block"
                                    fontColor={colors.white}
                                    fontWeight="bold"
                                    lineHeight="1.3em"
                                    letterSpacing="1px"
                                    fontSize={isSmallScreen ? '38px' : '46px'}
                                >
                                    {this.props.translate.get(Key.LaunchKit, Deco.CapWords)}
                                </Text>
                                <Container paddingTop="18px">
                                    <Text fontColor={colors.linkSectionGrey} fontSize="18px">
                                        {this.props.translate.get(Key.LaunchKitPitch, Deco.Cap)}
                                    </Text>
                                </Container>
                                <Container
                                    paddingTop="54px"
                                    className={`flex clearfix sm-mx-auto ${isSmallScreen ? 'justify-center' : ''}`}
                                >
                                    <Container paddingRight="20px">
                                        <Link to={WebsitePaths.Docs}>
                                            <Button
                                                padding={isSmallScreen ? smallButtonPadding : largeButtonPadding}
                                                borderRadius="4px"
                                                borderColor={colors.white}
                                            >
                                                <Text fontSize="16px" fontWeight="bold">
                                                    {this.props.translate.get(Key.GetStarted, Deco.Cap)}
                                                </Text>
                                            </Button>
                                        </Link>
                                    </Container>
                                    <div>
                                        <Link to={WebsitePaths.Portal}>
                                            <Button
                                                backgroundColor={lighterBackgroundColor}
                                                borderColor={colors.white}
                                                fontColor={colors.white}
                                                padding={isSmallScreen ? smallButtonPadding : largeButtonPadding}
                                                borderRadius="4px"
                                            >
                                                <Text fontSize="16px" fontWeight="bold" fontColor={colors.white}>
                                                    {this.props.translate.get(Key.LearnMore, Deco.Cap)}
                                                </Text>
                                            </Button>
                                        </Link>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <Container
                            marginTop={isSmallScreen ? '60px' : '30px'}
                            marginBottom="30px"
                            marginLeft="15px"
                            marginRight="15px"
                        >
                            <Image
                                src="/images/launch_kit/0x_cupboard.svg"
                                maxWidth={isSmallScreen ? '75%' : '100%'}
                                height="auto"
                            />
                        </Container>
                    </div>
                </div>;
                {this._renderBenefits(BENEFITS_1)}
            </div>
        );
    }
    private _renderSection(): React.ReactNode {
        return (
            <div className="clearfix pb4" style={{ backgroundColor: darkerBackgroundColor }}>
                <Container
                    className="mx-auto"
                    textAlign="center"
                    paddingTop="89px"
                    paddingBottom="89px"
                    maxWidth="421px"
                >
                    <Text fontSize="26px" lineHeight="37px" fontWeight="medium" fontColor={colors.white}>
                        Perfect for developers who need simple exchange functionality
                    </Text>
                </Container>
                {this._renderBenefits(BENEFITS_2)}
            </div>
        );
    }
    private _renderCallToAction(): React.ReactNode {
        const isSmallScreen = this.state.screenWidth === ScreenWidths.Sm;
        const smallButtonPadding = '8px 14px 8px 14px';
        const largeButtonPadding = '8px 14px 8px 14px';
        return (
            <Container
                className="clearfix"
                backgroundColor={lighterBackgroundColor}
                paddingTop="90px"
                paddingBottom="90px"
            >
                <Container className="clearfix mx-auto" maxWidth="850px">
                    <Container className="lg-left md-left sm-mx-auto sm-pb3" width="348px">
                        <Text fontColor={colors.white} fontSize="18px">
                            View our comprehensive documentation to start building today.
                        </Text>
                    </Container>
                    <Container
                        className={`lg-right md-right flex clearfix sm-mx-auto ${
                            isSmallScreen ? 'justify-center' : ''
                        }`}
                        paddingTop="5px"
                    >
                        <Container paddingRight="20px">
                            <Link to={WebsitePaths.Docs}>
                                <Button
                                    padding={isSmallScreen ? smallButtonPadding : largeButtonPadding}
                                    borderRadius="4px"
                                    backgroundColor={lighterBackgroundColor}
                                    borderColor={colors.white}
                                >
                                    <Text fontSize="16px" fontWeight="bold" fontColor={colors.white}>
                                        {this.props.translate.get(Key.ExploreTheDocs, Deco.Cap)}
                                    </Text>
                                </Button>
                            </Link>
                        </Container>
                        <div>
                            <Link to={constants.URL_ZEROEX_CHAT}>
                                <Button
                                    padding={isSmallScreen ? smallButtonPadding : largeButtonPadding}
                                    borderRadius="4px"
                                >
                                    <Text fontSize="16px" fontWeight="bold">
                                        {this.props.translate.get(Key.GetInTouch, Deco.Cap)}
                                    </Text>
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Container>
            </Container>
        );
    }
    private _renderBenefits(benefits: Benefit[]): React.ReactNode {
        return (
            <Container className="lg-flex md-flex justify-between mx-auto pb4" maxWidth="890px">
                {_.map(benefits, benefit => {
                    return (
                        <Container className="mx-auto sm-pb4" width="240px">
                            <Container textAlign="center">
                                <img src={benefit.icon} />
                            </Container>
                            <Container paddingTop="26px">
                                <Text
                                    fontSize="18px"
                                    lineHeight="28px"
                                    textAlign="center"
                                    fontColor={colors.linkSectionGrey}
                                >
                                    {benefit.description}
                                </Text>
                            </Container>
                        </Container>
                    );
                })}
            </Container>
        );
    }
    private _updateScreenWidth(): void {
        const newScreenWidth = utils.getScreenWidth();
        if (newScreenWidth !== this.state.screenWidth) {
            this.setState({
                screenWidth: newScreenWidth,
            });
        }
    }
}
