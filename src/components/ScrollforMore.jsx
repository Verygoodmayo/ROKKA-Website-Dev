import arrowRight from '../../static/svg/UI/Arrow_Right.svg'

export default function ScrollforMore () {

    return (
        <div
            className="scroll-for-more"
        >
            Scroll to Explore
            <img
                className='image'
                src={arrowRight}
            ></img>

        </div>
    )
}