import { toast } from "react-toastify";
import { useUserStore } from "../zustand/store"
import { customAxios } from "../axios/axios";
import { useMutation } from "react-query";


const useWishlist = () => {
  const {user, setUser} = useUserStore();

  const addToWishlistMutation = useMutation(async (productId: string) => {
      const res = await customAxios.post(`wishlist/${productId}`)
      return res.data;
  }, {
    onSuccess: () => {
        toast.success("Product added to wishlist")
    },
    onError: (error, productId: string) => {
        toast.error("Error when adding product to wishlist")
        if (user) {
            setUser({
                ...user,
                wishlist: user.wishlist.filter(id => id !== productId)
            })
        }
    }
  })

  const removeFromWishlistMutation = useMutation(async (productId: string) => {
        const res = await customAxios.delete(`wishlist/${productId}`)
        return res.data;
  },{
    onSuccess: () => {
        toast.success("Product removed from wishlist")
    },
    onError: (error, productId: string) => {
        toast.error("Error when removing product from wishlist")
        if( user) {
     
            setUser({
            ...user,
            wishlist: [...user.wishlist, productId]
        })
    }
    }
  })

    const addToWishlist = async (productId: string) => {
        if (user) {
            setUser({
                ...user,
                wishlist: [...user.wishlist, productId]
            })

        addToWishlistMutation.mutate(productId)

        return
        }

        toast.error("You need to be logged in to add to wishlist")
    }

    const removeFromWishlist = async (productId: string) => {
        if (user) {
        setUser({
            ...user,
            wishlist: user.wishlist.filter(id => id !== productId)
        })

        removeFromWishlistMutation.mutate(productId)

    }
    }

    return {addToWishlist, removeFromWishlist}
}

export default useWishlist