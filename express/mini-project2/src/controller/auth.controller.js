export const login = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    req.session.user = { username };

    res.cookie("username", username, { httpOnly: true, maxAge: 1000*60*60*24 }); // client side cookie 
    res.json({ message: "Login successful", username });
};

export const logout = (req,res) => {
    res.clearCookie("username");
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({error:"Error logging out"})
        }

        res.json({message:"Logout successful"});
    })
}