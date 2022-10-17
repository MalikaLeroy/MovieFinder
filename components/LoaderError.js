import ThreeDots from '../public/threedots.svg';
export default function loaderError({ type, children,height }) {
    if (type == "error") {
        return (
            <p className='error'><span>{children}</span></p>
        )
    } else {
        return (
            <div className='loader' ><ThreeDots title={"Chargement..."}/></div>
        )
    }
}