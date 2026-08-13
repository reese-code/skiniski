import { Link } from 'react-router-dom'

function Button({ to, href, children, className = '', ...props }) {
  const classes = `inline-block rounded text-[20px] px-10 py-3 bg-dark text-white transition-colors hover:bg-accent ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  )
}

export default Button
