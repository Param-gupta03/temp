import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : null;
    const sellerId = searchParams.get('sellerId');
    const all = searchParams.get('all') === 'true';

    const { db } = await connectToDatabase();

    if (id) {
      // Fetch single product
      const product = await db.collection('products').findOne({ id });
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ product });
    }

    // Fetch list of products
    let filter: any = {};
    if (!all) {
      filter.is_verified = true;
    }
    if (sellerId) {
      filter.seller_id = sellerId;
    }

    let cursor = db.collection('products').find(filter).sort({ created_at: -1 });
    if (limit) {
      cursor = cursor.limit(limit);
    }

    const products = await cursor.toArray();
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Fetch Products Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, category, seller_id, imageUrl, material_used, weight, number_of_item } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: 'Product name and price are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const productId = 'prod_' + crypto.randomBytes(8).toString('hex');

    const newProduct = {
      id: productId,
      name,
      price: Number(price),
      description: description || '',
      category: category || '',
      seller_id: seller_id || 'local-seller',
      image_url: imageUrl || '',
      material_used: material_used || '',
      weight: weight || '',
      is_verified: false,
      admin_price: null,
      number_of_item: Number(number_of_item || 0),
      carbon_footprint: null,
      created_at: new Date(),
    };

    await db.collection('products').insertOne(newProduct);
    return NextResponse.json({ product: newProduct });
  } catch (error: any) {
    console.error('Add Product Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, updatedFields, quantityPurchased } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    if (quantityPurchased !== undefined) {
      // Update stock/quantity purchase
      const product = await db.collection('products').findOne({ id });
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      const currentStock = Number(product.number_of_item || 0);
      const nextStock = Math.max(0, currentStock - quantityPurchased);

      await db.collection('products').updateOne(
        { id },
        { $set: { number_of_item: nextStock } }
      );

      return NextResponse.json({ success: true, newStock: nextStock });
    }

    if (!updatedFields) {
      return NextResponse.json({ error: 'Updated fields are required' }, { status: 400 });
    }

    // Clean up fields to set
    const setFields: any = {};
    const keys = [
      'name', 'price', 'description', 'category', 'image_url',
      'material_used', 'weight', 'is_verified', 'admin_price', 'number_of_item', 'carbon_footprint'
    ];

    keys.forEach((key) => {
      // Map frontend keys if necessary
      let val = updatedFields[key];
      if (key === 'image_url' && updatedFields.imageUrl !== undefined) {
        val = updatedFields.imageUrl;
      }
      if (key === 'number_of_item' && updatedFields.numberOfItem !== undefined) {
        val = updatedFields.numberOfItem;
      }

      if (val !== undefined) {
        if (key === 'price' || key === 'admin_price' || key === 'number_of_item') {
          setFields[key] = val !== null ? Number(val) : null;
        } else {
          setFields[key] = val;
        }
      }
    });

    const result = await db.collection('products').findOneAndUpdate(
      { id },
      { $set: setFields },
      { returnDocument: 'after' }
    );

    const updatedProduct = result && ('value' in result ? (result as any).value : result);

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error('Update Product Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('products').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete Product Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
