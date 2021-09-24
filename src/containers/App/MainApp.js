import React, {useEffect} from "react";
import {Layout, Row, Col} from "antd";
import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";
import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";
import {useDispatch, useSelector} from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import {useRouteMatch} from "react-router-dom";
import {ObtenerPermisosUsuarioReducer, ObtenerModulosUsuarioReducer} from '../../appRedux/actions/Usuarios/Usuarios'
import {
    SeleccionarPaisReducer,
    userSignIn
} from "../../appRedux/actions/Auth";

const {Content, Footer} = Layout;

const MainApp = () => {
    const dispatch = useDispatch();

    const {width, navStyle} = useSelector(({settings}) => settings);
    const match = useRouteMatch();
    const {listaPaises} = useSelector(({auth}) => auth);

    const getContainerClass = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DARK_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_DEFAULT_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_BELOW_HEADER:
                return "gx-container-wrap";
            case NAV_STYLE_ABOVE_HEADER:
                return "gx-container-wrap";
            default:
                return '';
        }
    }

    const getNavStyles = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DEFAULT_HORIZONTAL :
                return <HorizontalDefault/>;
            case NAV_STYLE_DARK_HORIZONTAL :
                return <HorizontalDark/>;
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
                return <InsideHeader/>;
            case NAV_STYLE_ABOVE_HEADER :
                return <AboveHeader/>;
            case NAV_STYLE_BELOW_HEADER :
                return <BelowHeader/>;
            case NAV_STYLE_FIXED :
                return <Topbar/>;
            case NAV_STYLE_DRAWER :
                return <Topbar/>;
            case NAV_STYLE_MINI_SIDEBAR :
                return <Topbar/>;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
                return <NoHeaderNotification/>;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
                return <NoHeaderNotification/>;
            default :
                return null;
        }
    };

    const getSidebar = (navStyle, width) => {
        if (width < TAB_SIZE) {
            return <Sidebar/>;
        }
        switch (navStyle) {
            case NAV_STYLE_FIXED :
                return <Sidebar/>;
            case NAV_STYLE_DRAWER :
                return <Sidebar/>;
            case NAV_STYLE_MINI_SIDEBAR :
                return <Sidebar/>;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
                return <Sidebar/>;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
                return <Sidebar/>;
            default :
                return null;
        }
    };

    var fecha = new Date();
    var ano = fecha. getFullYear();

    useEffect(() => {
        dispatch(ObtenerPermisosUsuarioReducer())
        dispatch(ObtenerModulosUsuarioReducer())

        dispatch(
            userSignIn(
                {
                    usuario      : localStorage.getItem('Log-usuario'),
                    contrasena   : localStorage.getItem('Log-contrasenia'),
                    pais         : localStorage.getItem('Log-pais'),
                    posicionPais : localStorage.getItem('Log-posicionPais'),
                }
            )
        );
        // console.log('Login otra vez!')
    }, [])

    useEffect(() => {
        dispatch(SeleccionarPaisReducer(localStorage.getItem('posicionPaisSeleccionado')))
    }, [listaPaises])

    return (
        <Layout className="gx-app-layout" style={{position:'relative'}}>
            {getSidebar(navStyle, width)}
            <Layout>
                {getNavStyles(navStyle)}
                <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
                    <App match={match}/>
                    <Footer style={{borderTop: 'solid 0px', background: 'white'}}>
                        <Row style={{ display: "flex", textAlign: "-webkit-center" }}>
                            <Col 
                                xl={8} md={8} sm={8} xs={8} 
                                style={{
                                textAlign     : "-webkit-right",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                            >
                                © {ano} Grow Analytics
                            </Col>
                            <Col 
                                xl={8} md={8} sm={8} xs={8}
                                style={{
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                            >
                                Todos los derechos reservados
                            </Col>
                            <Col 
                                xl={8} md={8} sm={8} xs={8} 
                                style={{
                                textAlign     : "-webkit-left",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                            >
                                Políticas de privacidad
                            </Col>
                        </Row>
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    )
};
export default MainApp;