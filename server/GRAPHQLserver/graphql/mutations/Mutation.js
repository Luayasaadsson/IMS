


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { Product } = require("../../models/Product");
const ProductType = require("../types/ProductType");

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a new product
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        sku: { type: GraphQLInt },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        manufacturerName: { type: GraphQLString },
        manufacturerCountry: { type: GraphQLString },
        manufacturerWebsite: { type: GraphQLString },
        manufacturerDescription: { type: GraphQLString },
        manufacturerAddress: { type: GraphQLString },
        contactName: { type: GraphQLString },
        contactEmail: { type: GraphQLString },
        contactPhone: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
      },
      async resolve(_, args) {
        try {
          // Kolla om produkten redan finns med samma namn eller SKU
          const existingProduct = await Product.findOne({
            $or: [{ name: args.name }, { sku: args.sku }],
          });

          // Om produkten redan finns, kasta ett fel
          if (existingProduct) {
            throw new Error(
              "Product with the same name or SKU already exists, please try again."
            );
          }

          // Skapa en ny produkt
          const newProduct = new Product({
            name: args.name,
            sku: args.sku,
            description: args.description,
            price: args.price,
            category: args.category,
            manufacturer: {
              name: args.manufacturerName,
              country: args.manufacturerCountry,
              website: args.manufacturerWebsite,
              description: args.manufacturerDescription,
              address: args.manufacturerAddress,
              contact: {
                name: args.contactName,
                email: args.contactEmail,
                phone: args.contactPhone,
              },
            },
            amountInStock: args.amountInStock,
          });

          // Försök att spara produkten och returnera den
          return await newProduct.save();
        } catch (error) {
          // Fångar och kastar ett fel om något går fel
          throw new Error(`Failed to create product: ${error.message}`);
        }
      },
    },
    // Update an existing product
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLInt },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        manufacturerName: { type: GraphQLString },
        manufacturerCountry: { type: GraphQLString },
        manufacturerWebsite: { type: GraphQLString },
        manufacturerDescription: { type: GraphQLString },
        manufacturerAddress: { type: GraphQLString },
        contactName: { type: GraphQLString },
        contactEmail: { type: GraphQLString },
        contactPhone: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
      },
      async resolve(_, args) {
        try {
          // Hitta produkten med angivet ID
          const existingProduct = await Product.findById(args.id);

          // Om produkten inte hittas, kasta ett fel
          if (!existingProduct) {
            throw new Error("Product not found");
          }

          // Sammanställ uppdateringsobjektet
          const updates = {
            name: args.name || existingProduct.name,
            sku: args.sku || existingProduct.sku,
            description: args.description || existingProduct.description,
            price: args.price || existingProduct.price,
            category: args.category || existingProduct.category,
            manufacturer: {
              name: args.manufacturerName || existingProduct.manufacturer.name,
              country: args.manufacturerCountry || existingProduct.manufacturer.country,
              website: args.manufacturerWebsite || existingProduct.manufacturer.website,
              description: args.manufacturerDescription || existingProduct.manufacturer.description,
              address: args.manufacturerAddress || existingProduct.manufacturer.address,
              contact: {
                name: args.contactName || existingProduct.manufacturer.contact.name,
                email: args.contactEmail || existingProduct.manufacturer.contact.email,
                phone: args.contactPhone || existingProduct.manufacturer.contact.phone,
              },
            },
            amountInStock: args.amountInStock || existingProduct.amountInStock,
          };

          // Uppdatera produkten och returnera den
          return Product.findByIdAndUpdate(args.id, updates, { new: true });
        } catch (error) {
          // Fångar och kastar ett fel om något går fel
          throw new Error(`Failed to update product: ${error.message}`);
        }
      },
    },

    // Delete a product
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, { id }) {
        try {
          // Försök att ta bort produkten
          const deletedProduct = await Product.findByIdAndDelete(id);
          
          // Om produkten inte hittas, kasta ett fel
          if (!deletedProduct) {
            throw new Error("Product not found");
          }
          return deletedProduct;
        } catch (error) {
          // Fångar och kastar ett fel om något går fel
          throw new Error(`Failed to delete product: ${error.message}`);
        }
      },
    },
    // Delete all products
    deleteAllProducts: {
      type: new GraphQLList(ProductType),
      async resolve() {
        try {
          // Försök att ta bort alla produkter
          const deletedProducts = await Product.deleteMany({});
          return deletedProducts;
        } catch (error) {
          // Fångar och kastar ett fel om något går fel
          throw new Error("Failed to delete all products");
        }
      },
    },
  },
});

module.exports = Mutation;
