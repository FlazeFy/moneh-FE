export default function GetBreakLine({length}) {
    const builder = Array(length).fill(1)

    return (
        <>
            {
                builder.map((_, i) => {
                    return <br key={i}></br>
                })
            }
        </>
    )
}
  