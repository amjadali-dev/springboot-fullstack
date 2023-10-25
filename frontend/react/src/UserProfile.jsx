const UserProfile = ({ name, age, gender, imageNumber, ...remaining }) => {
    gender = gender === "male" ? "men" : "women"
    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
            <img src={`https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`} />
            {remaining.children}
        </div>
    )
}

export default UserProfile