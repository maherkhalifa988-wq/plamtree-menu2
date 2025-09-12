export default function MenuGrid({groups, currency='₪'}) {
  return <>
    {groups.map((g,i)=>(
      <section key={i}>
        <h3 className="groupTitle">{g.name}</h3>
        <div className="grid">
          {g.items.map((it,j)=>(
            <article key={j} className="card" aria-label={it.name}>
              <img src={it.image||'/placeholder/logo.svg'} alt={it.name} />
              <div style={{marginTop:8,textAlign:'center'}}>
                <div style={{fontWeight:700}}>{it.name}</div>
                <div className="small">{currency} {it.price}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    ))}
  </>
}
