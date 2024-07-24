export default function MenuBar({data}) {
    return (
        <>
            <div>{data.tagline}</div>
            <div>{data.heading}</div>
            <div>{data.subheading}</div>
            <img src={data.img} width={600}/>
        </>
    );
}
